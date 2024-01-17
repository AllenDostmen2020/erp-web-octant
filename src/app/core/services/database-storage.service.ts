import { inject, Injectable, Injector } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { FetchService } from './fetch.service';
import { PaginatorData } from 'src/app/shared/interfaces/paginator';
import { getWeek } from 'date-fns';

const SAL_LONG = 16;
const INITIALIZATION_VECTOR_LONG = SAL_LONG;

const bufferABase64 = (buffer: any) => btoa(String.fromCharCode(...new Uint8Array(buffer)));
const base64ABuffer = (buffer: any) => Uint8Array.from(atob(buffer), c => c.charCodeAt(0));

const passwordBasedKeyDerivation = async (password: string, sal: any, iterations: number, long: number, hash: any, algoritmo = 'AES-CBC') => {
    const encoder = new TextEncoder();
    let key = await window.crypto.subtle.importKey('raw', encoder.encode(password), { name: 'PBKDF2' }, false, ['deriveKey']);
    return await window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: encoder.encode(sal),
            iterations,
            hash
        },
        key,
        { name: algoritmo, length: long },
        false,
        ['encrypt', 'decrypt'],
    );
}

const encrypt = async (password: string, textoPlano: any) => {
    const encoder = new TextEncoder();
    const sal = window.crypto.getRandomValues(new Uint8Array(SAL_LONG));
    const initializationVector = window.crypto.getRandomValues(new Uint8Array(INITIALIZATION_VECTOR_LONG));
    const textPlainBuffer = encoder.encode(textoPlano);
    const clave = await passwordBasedKeyDerivation(password, sal, 100000, 256, 'SHA-256');
    const encrypted = await window.crypto.subtle.encrypt({ name: "AES-CBC", iv: initializationVector }, clave, textPlainBuffer);
    return bufferABase64([...sal, ...initializationVector, ...new Uint8Array(encrypted)]);
};

const decrypt = async (password: string, encriptadoEnBase64: any) => {
    const decoder = new TextDecoder();
    const encryptData = base64ABuffer(encriptadoEnBase64);
    const sal = encryptData.slice(0, SAL_LONG);
    const initializationVector = encryptData.slice(0 + SAL_LONG, SAL_LONG + INITIALIZATION_VECTOR_LONG);
    const clave = await passwordBasedKeyDerivation(password, sal, 100000, 256, 'SHA-256');
    const decryptDataBuffer = await window.crypto.subtle.decrypt({ name: "AES-CBC", iv: initializationVector }, clave, encryptData.slice(SAL_LONG + INITIALIZATION_VECTOR_LONG));
    return decoder.decode(decryptDataBuffer);
}

export enum NameModuleDatabase {
    BoxOpenings = 'boxOpenings',
    Banks = 'banks',
    Users = 'users',
    Taxes = 'taxes',
    DocumentTypes = 'documentTypes',
    Plans = 'plans',
    VehicleTypes = 'vehicleTypes',
}

enum Recurrent {
    Hourly = 'hourly',
    Daily = 'daily',
    Weekly = 'weekly',
    Monthly = 'monthly',
    Yearly = 'yearly',
}

interface StorageConfiguration<T = any> {
    data: any;
    recurrent: Recurrent;
    lastUpdate: Date;
}

interface ModuleConfiguration {
    key: NameModuleDatabase;
    config: {
        url: string;
        queryParams?: string;
    };
    recurrent: Recurrent;
}

const MODULES: ModuleConfiguration[] = [
    {
        key: NameModuleDatabase.BoxOpenings,
        recurrent: Recurrent.Hourly,
        config: {
            url: 'box-opening',
            queryParams: 'relations=box.account.bank&box_status=abierto&limit=100'
        },
    },
    {
        key: NameModuleDatabase.Banks,
        recurrent: Recurrent.Hourly,
        config: {
            url: 'database-storage/banks'
        },
    },
    {
        key: NameModuleDatabase.Users,
        recurrent: Recurrent.Hourly,
        config: {
            url: 'database-storage/users'
        },
    },
    {
        key: NameModuleDatabase.Taxes,
        recurrent: Recurrent.Hourly,
        config: {
            url: 'database-storage/taxes'
        },
    },
    {
        key: NameModuleDatabase.DocumentTypes,
        recurrent: Recurrent.Hourly,
        config: {
            url: 'database-storage/document-types'
        },
    },
    {
        key: NameModuleDatabase.Plans,
        recurrent: Recurrent.Hourly,
        config: {
            url: 'database-storage/plans'
        },
    },
    {
        key: NameModuleDatabase.VehicleTypes,
        recurrent: Recurrent.Hourly,
        config: {
            url: 'database-storage/vehicle-types'
        },
    },
]

@Injectable({ providedIn: 'root' })
export class DatabaseStorageService {

    private storageMap = inject(StorageMap);
    private fetch = inject(FetchService);
    private modules: ModuleConfiguration[] = MODULES;

    public async getOne<T = any>(key: NameModuleDatabase, id: number): Promise<T | undefined> {
        return (await this.getData<any>(key)).find((item) => item.id == id);
    }

    public async getData<T>(key: NameModuleDatabase): Promise<T[]> {
        const config = this.modules.find((e) => e.key == key)!;
        return new Promise(async (resolve) => {
            this.storageMap.get(key).subscribe(async (res) => {
                if (res) {
                    const { recurrent, lastUpdate } = res as StorageConfiguration<T>;

                    const c_year = new Date().getFullYear();
                    const c_month = new Date().getMonth();
                    const c_date = new Date().getDate();
                    const c_week = getWeek(new Date(), { weekStartsOn: 1 });
                    const c_hour = new Date().getHours();
                    
                    const u_year = lastUpdate.getFullYear();
                    const u_month = lastUpdate.getMonth();
                    const u_date = lastUpdate.getDate();
                    const u_week = getWeek(lastUpdate, { weekStartsOn: 1 });
                    const u_hour = lastUpdate.getHours();

                    if (recurrent == Recurrent.Hourly && (c_year != u_year || c_month != u_month || c_date != u_date || c_hour != u_hour)) resolve(await this.getDataServer(config));
                    else if (recurrent == Recurrent.Daily && (c_year != u_year || c_month != u_month || c_date != u_date)) resolve(await this.getDataServer(config));
                    else if (recurrent == Recurrent.Weekly && (c_year != u_year || c_week != u_week)) resolve(await this.getDataServer(config));
                    else if (recurrent == Recurrent.Monthly && (c_year != u_year || c_month != u_month)) resolve(await this.getDataServer(config));
                    else if (recurrent == Recurrent.Yearly && c_year != u_year) resolve(await this.getDataServer(config));

                    const decode = await decrypt('0123456', (res as StorageConfiguration<T>).data);
                    resolve(JSON.parse(decode));
                } else {
                    resolve(this.getDataServer(config));
                }
            });
        });
    }

    public updateDataLocal(key: NameModuleDatabase): void {
        const config = this.modules.find((e) => e.key == key);
        if (!config) return;
        this.getDataServer(config);
    }

    private async getDataServer<T>(module: ModuleConfiguration, ignoreRecurrent?: boolean): Promise<T[]> {
        const { config, key, recurrent } = module;
        const url = `${config.url}?${config.queryParams ? config.queryParams : ''}`;
        const result = await this.fetch.get<T[] | PaginatorData<T>>(url);
        const data = result instanceof Array ? result : result.data;
        const storageConfig: StorageConfiguration<T> = {
            data: await encrypt('0123456', JSON.stringify(data)),
            recurrent,
            lastUpdate: new Date(),
        }
        this.storageMap.set(key, storageConfig).subscribe(() => { });
        return data;
    }

}