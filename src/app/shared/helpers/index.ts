import { Injectable, inject } from "@angular/core"
import { DocumentType, DocumentTypeName } from "@interface/documentType";
import { Taxe, TaxeName } from "@interface/taxe";
import { DataDNI, DataRUC } from "@interface/user";
import { FetchService } from "@service/fetch.service";

export const getTaxe = (taxes: Taxe[], taxeName: TaxeName) => {
    const taxe = taxes.find(item => item.name.toUpperCase() == taxeName.toUpperCase());
    return taxe;
}


export const getDocumentType = (documentTypes: DocumentType[], documentTypeName: DocumentTypeName) => {
    const documentType = documentTypes.find(item => item.name.toUpperCase() == documentTypeName.toUpperCase());
    return documentType;
}


interface DataPerson {
    document_type: 'DNI' | 'RUC';
    document_number: string;
    full_name: string;

    name?: string;
    mother_last_name?: string;
    father_last_name?: string;
    verifier_code?: string;

    business_name?: string;
    address?: string;
    full_address?: string;
    retaining_agent?: 'SI' | 'NO';
    sunat_condition?: string;
    legal_representatives?: any[];
}

export const getDataPersonFormDocumentNumber = async (fetch: FetchService, documentNumber: string, abortController: AbortController = new AbortController()): Promise<DataPerson | undefined> => {
    let type = '';
    if (documentNumber.length == 8) type = 'dni';
    else if (documentNumber.length == 11) type = 'ruc';
    else return undefined;

    const data = await fetch.get<any>(`${type}/${documentNumber}`, {
        signal: abortController.signal,
        toast: {
            loading: `Buscando ${type.toUpperCase()}...`,
            success: `${type.toUpperCase()} encontrado`,
            error: (error) => error.error?.message ?? 'Error al buscar',
        }
    });
    if ((data as DataDNI).nombres) return {
        document_type: 'DNI',
        document_number: documentNumber,
        full_name: `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`,
        name: data.nombres,
        mother_last_name: data.apellidoMaterno,
        father_last_name: data.apellidoPaterno,
        verifier_code: data.codVerifica,
    }
    else if ((data as DataRUC).nombre_o_razon_social) return {
        document_type: 'RUC',
        document_number: documentNumber,
        full_name: data.nombre_o_razon_social,
        business_name: data.nombre_o_razon_social,
        address: data.direccion,
        full_address: data.direccion_completa,
        retaining_agent: data.es_agente_de_retencion,
        sunat_condition: data.estado,
        legal_representatives: data.representantes_legales ?? [],
    }
    return undefined;
}