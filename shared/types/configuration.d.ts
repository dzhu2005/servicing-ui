// Shape of the JSON stored in the AWS Secrets Manager secret (default "secman-los-uat").
// Loaded server-side only — see server/utils/configuration.ts.

export interface CyberArkConfiguration {
    SamlIdpEntityId: string
    SamlIdpSsoUrl: string
    SamlIdpLogoutUrl: string
    SamlIdpCertificate: string
    SamlSpEntityId: string
    SamlNuxtCallbackBaseUrl: string
}

export interface CmhcConfiguration {
    UserId: string
    Password: string
    FinInst: string
    Transit: string
    CallbackHash: string
}

export interface Auth0Configuration {
    Domain: string
    ClientId: string
    ClientSecret: string
    SessionSecret: string
    AppBaseUrl: string
    Connection: string
}

export interface MiddleWareConfiguration {
    ClientId: string
    ClientSecret: string
    BaseUrl: string
    TokenUrl: string
    Audience: string
}

export interface EquifaxCreditBureauConfiguration {
    TokenServer: string
    TokenUsername: string
    TokenPassword: string
    CBServer: string
    EFXEnvironment: string
    CustomerCode: string
    HardPullCustomerNumber: string
    HardPullSecurityCode: string
    SoftPullCustomerNumber: string
    SoftPullSecurityCode: string
    MemberNumber: string
    SecurityCode: string
}

export interface TransUnionCreditBureauConfiguration {
    TUV2BaseURL: string
    TUV2TokenEndPoint: string
    TUV2TokenUserName: string
    TUV2TokenPassword: string
    TUV2PfxCertificate: string
    TUV2PfxCertificatePassword: string
    TUV2PullCreditBureauEndPoint: string
    TransUnionVendorName: string
    TransUnionVendorID: string
    TransUnionReleaseNumber: string
    MemberCode: string
    SecurityCode: string
}

export interface PosAccountConfiguration {
    EndPoint: string
    Username: string
    Password: string
    TokenServer?: string
    Channel?: string
}

export interface PosAccountsConfiguration {
    Filogix: PosAccountConfiguration[]
    Newton: PosAccountConfiguration[]
    Scarlett: PosAccountConfiguration[]
    BOSS: PosAccountConfiguration[]
    Finmo: PosAccountConfiguration[]
}

export interface SystemEndPointsConfiguration {
    SMAPI: string
    SMPortal: string
    SMUI: string
    LOSAPI: string
    LOSUI: string
    LOSSharedAPI: string
}

export interface OasSettingsConfiguration {
    BranchId: number
    LosRoleId: number
    PosRoleId: number
}

export interface LenderIdListConfiguration {
    LenderIdList: number[]
}

export interface FilogixLenderAccountConfiguration {
    LinkId: string
    LenderCode: string
}

export interface LenderAccountsConfiguration {
    Filogix: FilogixLenderAccountConfiguration[]
    Newton: LenderIdListConfiguration
    BOSS: LenderIdListConfiguration
    Scarlett: LenderIdListConfiguration
    Filmo: LenderIdListConfiguration
}

export interface DatabaseConfiguration {
    Host: string
    Database: string
    Username: string
    Password: string
    Port: number
}

export interface S3BucketConfiguration {
    Bucket: string
    AccessKey: string
    SecretKey: string
    RootFolder: string
}

export interface S3Configuration {
    Los: S3BucketConfiguration
    Public: S3BucketConfiguration
}

export interface KmsConfiguration {
    KeyId: string
    UseGeneratedDataKeys: boolean
    AccessKey: string
    SecretKey: string
    EncKeyData: string
    EncKeyFile: string
}

export interface SqsConfiguration {
    QueueUrl: string
}

export interface LenderAttributeConfiguration {
    AttributeName: string
    AttributeValue: string
}

export interface RedisConfiguration {
    Host: string
    Password: string
    Port: number
}

export interface JwtConfiguration {
    Issuer: string
    Audience: string
    DurationInSeconds: number
    SymmetricSecurityKey: string
    PrivateKeyPem: string
    PublicKeyPem: string
}

export interface DocusignConfiguration {
    ClientId: string
    UserId: string
    APIAccountId: string
    AuthServer: string
    BaseURL: string
    PrivateKey: string
    CallbackHash: string
    SenderEmail: string
    SenderName: string
}

export interface Configuration {
    CyberArk: CyberArkConfiguration
    Cmhc: CmhcConfiguration
    Auth0: Auth0Configuration
    MiddleWare: MiddleWareConfiguration
    CANADA_POST_API_KEY: string
    EquifaxCreditBureau: EquifaxCreditBureauConfiguration
    TransUnionCreditBureau: TransUnionCreditBureauConfiguration
    PosAccounts: PosAccountsConfiguration
    SystemEndPoints: SystemEndPointsConfiguration
    OasSettings: OasSettingsConfiguration
    LenderAccounts: LenderAccountsConfiguration
    Database: DatabaseConfiguration
    S3: S3Configuration
    Kms: KmsConfiguration
    Sqs: SqsConfiguration
    LenderAttributes: LenderAttributeConfiguration[]
    Redis: RedisConfiguration
    EncryptionKey: string
    Jwt: JwtConfiguration
    Docusign: DocusignConfiguration
    Env: string
    AsposeLicense: string
}
