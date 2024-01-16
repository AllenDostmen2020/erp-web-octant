import { inject, Injectable, Injector } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { FetchService } from './fetch.service';
import { PaginatorData } from 'src/app/shared/interfaces/paginator';

interface IServerModule {
    key: NameModuleDatabase;
    config: {
        url: string;
        queryParams?: string;
    };
}

declare type DataOrigin = 'local' | 'server';

export enum NameModuleDatabase {
    SURRENDER_BOX_OPENINGS = 'SURRENDER_BOX_OPENINGS',
    BOX_OPENINGS = 'BOX_OPENINGS',
    BANKS = 'BANKS',
    USERS = 'USERS',
    MEASUREMENT_UNITS = 'MEASUREMENT_UNITS',
    CUSTOMERS = 'CUSTOMERS',
    PROVIDERS = 'PROVIDERS',
    COST_CENTER_TYPES = 'COST_CENTER_TYPES',
    CODE_COUNTRIES = 'CODE_COUNTRIES',
    TAXES = 'TAXES',
    DOCUMENT_TYPES = 'DOCUMENT_TYPES',
}

const MODULES = [
    {
        key: NameModuleDatabase.BOX_OPENINGS,
        config: {
            url: 'box-opening',
            queryParams: 'relations=box.account.bank&box_status=abierto&limit=100'
        },
    },
    {
        key: NameModuleDatabase.SURRENDER_BOX_OPENINGS,
        config: {
            url: 'surrender-box-opening',
            queryParams: 'relations=surrender_box.account.bank&surrender_box_status=abierto&limit=200'
        },
    },
    {
        key: NameModuleDatabase.BANKS,
        config: {
            url: 'database-storage/banks'
        },
    },
    {
        key: NameModuleDatabase.USERS,
        config: {
            url: 'database-storage/users'
        },
    },
    {
        key: NameModuleDatabase.CUSTOMERS,
        config: {
            url: 'database-storage/customers'
        },
    },
    {
        key: NameModuleDatabase.PROVIDERS,
        config: {
            url: 'database-storage/providers'
        },
    },
    {
        key: NameModuleDatabase.COST_CENTER_TYPES,
        config: {
            url: 'database-storage/cost-center-types'
        },
    },
    {
        key: NameModuleDatabase.MEASUREMENT_UNITS,
        config: {
            url: 'database-storage/measurement-units'
        },
    },
    {
        key: NameModuleDatabase.CODE_COUNTRIES,
        config: {
            url: 'database-storage/code-countries'
        },
    },
    {
        key: NameModuleDatabase.TAXES,
        config: {
            url: 'database-storage/taxes'
        },
    },
    {
        key: NameModuleDatabase.DOCUMENT_TYPES,
        config: {
            url: 'database-storage/document-types'
        },
    },
]

@Injectable({
    providedIn: 'root',
})
export class DatabaseStorageService {

    private storageMap = inject(StorageMap);
    private fetch = inject(FetchService);
    private modules: IServerModule[] = MODULES ;

    /**
     * @description get one element from data local, NOT from server
     * @example getOne<Bank>(NameModuleDatabase.BANKS, 1)
     * @param key key of module
     * @param id id of element in data
     * @returns element from data or null if not found
     */
    public async getOne<T>(key: NameModuleDatabase, id: number): Promise<T | undefined> {
        const config = this.modules.find((e) => e.key == key);
        if (!config) return undefined;
        const dataIndexed = (await this.getDataLocal<T>(config)).reduce((acc, cur: any) => {
            acc[cur.id] = cur;
            return acc;
        }, {} as any);
        return dataIndexed[id] ?? undefined;
    }

    public async getData<T>(key: NameModuleDatabase, type: DataOrigin = 'local'): Promise<T[]> {
        const config = this.modules.find((e) => e.key == key);
        if (!config) return [];
        if (type == 'server') return await this.getDataServer(config);
        else return await this.getDataLocal(config);
    }

    public updateDataLocal(key: NameModuleDatabase): void {
        const config = this.modules.find((e) => e.key == key);
        if (!config) return;
        this.getDataServer(config);
    }

    private getDataLocal<T>({ key }: IServerModule): Promise<T[]> {
        return new Promise(async (resolve) => {
            this.storageMap.get(key).subscribe((res) => {
                if (res) resolve(res as T[]);
                resolve([]);
            });
        });
    }

    private async getDataServer<T>({ config, key }: IServerModule): Promise<T[]> {
        const url = `${config.url}?${config.queryParams ? config.queryParams : ''}`;
        const result = await this.fetch.get<T[] | PaginatorData<T>>(url);
        const data = result instanceof Array ? result : result.data;
        this.storageMap.set(key, data).subscribe(() => { });
        return data;
    }

}
