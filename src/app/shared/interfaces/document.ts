import { BaseModel, CoinEnum } from "./baseModel";
import { ComprobantTypeEnum } from "./boxMovement";
import { Client } from "./client";
import { ClientBusinessUnit } from "./clientBusinessUnit";
import { ClientPaymentDocument } from "./clientPaymentDocument";
import { Contract } from "./contract";
import { DocumentItem } from "./documentItem";

export interface Document extends BaseModel {
    client_id: number;
    contract_id: number;
    client_business_unit_id: number;
    description: string;
    type: ComprobantTypeEnum;
    serie: string;
    correlative: number;
    igv: number;
    emit_date: string;
    emit_comment: string;
    expiration_date: string;
    coin: CoinEnum;
    exchange_rate: string;
    detraction: boolean;
    detraction_percent: number;
    detraction_payment_type: DetractionPaymentTypeEnum;
    detraction_type: DetractionTypeEnum;
    perception: boolean;
    perception_percent: number;
    perception_type: string;
    retention: boolean;
    retention_percent: number;
    retention_type: string;
    fees: boolean;
    fees_number: number;
    payment_type: ComprobantPaymentTypeEnum;
    operation_type: ComprobantOperationTypeEnum;
    total_value: number;
    total_igv: number;
    total_discount: number;
    total_detraction: number;
    total_perception: number;
    total_retention: number;
    total_unaffected: number;
    total_exonerated: number;
    total_free: number;
    total_base_isc: number;
    total_isc: number;
    total_pay: number;
    total_pending: number;
    total: number;
    anulation_type: string;
    anulation_reason: string;
    filename: string;
    hash: boolean;
    xml: any;
    pdf: any;
    cdr: string;
    has_xml: boolean;
    has_pdf: boolean;
    has_cdr: boolean;
    sunat_status: string;
    sunat_information: string;
    sunat_qr_code_string: string;
    sunat_response_code: string;


    contract?: Contract;
    client?: Client;
    client_business_unit: ClientBusinessUnit[];
    document_items: DocumentItem[];
    client_payment_documents?: ClientPaymentDocument[];
}


export enum ComprobantOperationTypeEnum {
    VentaInterna = '1',
    Exportacion = '2',
    VentaInternaAnticipos = '4',
    VentasNoDomiciliadosNoExportacion = '29',
    OperacionSujetaDetraccion = '30',
    DetraccionServiciosTransporteCarga = '33',
    OperacionSujetaPercepcion = '34',
    DetraccionServiciosTransportePasajeros = '32',
    DetraccionRecursosHidrobiologicos = '31',
    VentaNacionalTuristasTaxFree = '35',
}

export enum DetractionTypeEnum {
    AzucarYMelazaDeCana = '1',
    Arroz = '2',
    AlcoholEtilico = '3',
    RecursosHidrobiologicos = '4',
    MaizAmarilloDuro = '5',
    CanaDeAzucar = '7',
    Madera = '8',
    ArenaYPiedra = '9',
    ResiduosSubproductosDesechosRecortesYDesperdicios = '10',
    BienesGravadosConElIGVORenunciaALaExoneracion = '11',
    IntermediacionLaboralYTercerizacion = '12',
    CarnesYDespojosComestibles = '13',
    AceiteDePescado = '14',
    HarinaPolvoYPelletsDePescadoCrustaceosMoluscosYDemasInvertebradosAcuaticos = '15',
    ArrendamientoDeBienesMuebles = '17',
    MantenimientoYReparacionDeBienesMuebles = '18',
    MovimientoDeCarga = '19',
    OtrosServiciosEmpresariales = '20',
    Leche = '21',
    ComisionMercantil = '22',
    FabricacionDeBienesPorEncargo = '23',
    ServicioDeTransporteDePersonas = '24',
    ServicioDeTransporteDeCarga = '25',
    TransporteDePasajeros = '26',
    ContratosDeConstruccion = '28',
    OroGravadoConElIGV = '29',
    PaprikaYOtrosFrutosDeLosGenerosCapsicumOPimienta = '30',
    MineralesMetalicosNoAuriferos = '32',
    BienesExoneradosDelIGV = '33',
    OroYDemasMineralesMetalicosExoneradosDelIGV = '34',
    DemasServiciosGravadosConElIGV = '35',
    MineralesNoMetalicos = '37',
    BienInmuebleGravadoConIGV = '38',
    Plomo = '39',
    AnimalesVivos = '40',
    AbonosCuerosYPielesDeOrigenAnimal = '41',
    Ley30737 = '42',
}

export enum DetractionPaymentTypeEnum {
    DepositoEnCuenta = '1',
    Giro = '2',
    TransferenciaDeFondos = '3',
    OrdenDePago = '4',
    TarjetaDeDebito = '5',
    TarjetaDeCreditoEmitidaEnElPaisPorUnaEmpresaDelSistemaFinanciero = '6',
    ChequesConLaCláusulaDeNONegociableIntransferiblesNoALaOrdenUOtraEquivalenteAQueSeRefiereElIncisoGDelArticulo5DeLaLey = '7',
    EfectivoPorOperacionesEnLasQueNoExisteObligacionDeUtilizarMedioDePago = '8',
    EfectivoEnLosDemasCasos = '9',
    MediosDePagoUsadosEnComercioExterior = '10',
    DocumentosEmitidosPorLasEDPYMESYLasCooperativasDeAhorroYCreditoNoAutorizadasACaptarDepositosDelPublico = '11',
    TarjetaDeCreditoEmitidaEnElPaisOEnElExteriorPorUnaEmpresaNoPertenecienteAlSistemaFinancieroCuyoObjetoPrincipalSeaLaEmisionYAdministracionDeTarjetasDeCredito = '12',
    TarjetasDeCreditoEmitidasEnElExteriorPorEmpresasBancariasOFinancierasNoDomiciliadas = '13',
    TransferenciasComercioExterior = '14',
    ChequesBancariosComercioExterior = '15',
    OrdenDePagoSimpleComercioExterior = '16',
    OrdenDePagoDocumentarioComercioExterior = '17',
    RemesaSimpleComercioExterior = '18',
    RemesaDocumentariaComercioExterior = '19',
    CartaDeCreditoSimpleComercioExterior = '20',
    CartaDeCreditoDocumentarioComercioExterior = '21',
    OtrosMediosDePago = '22',
}

export enum ComprobantPaymentTypeEnum {
    Contado = 'contado',
    Credito = 'crédito',
    Otros = 'otros',
}