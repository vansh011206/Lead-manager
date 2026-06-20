
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model UploadBatch
 * 
 */
export type UploadBatch = $Result.DefaultSelection<Prisma.$UploadBatchPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Meeting
 * 
 */
export type Meeting = $Result.DefaultSelection<Prisma.$MeetingPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Leads
 * const leads = await prisma.lead.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Leads
   * const leads = await prisma.lead.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs>;

  /**
   * `prisma.uploadBatch`: Exposes CRUD operations for the **UploadBatch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UploadBatches
    * const uploadBatches = await prisma.uploadBatch.findMany()
    * ```
    */
  get uploadBatch(): Prisma.UploadBatchDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.meeting`: Exposes CRUD operations for the **Meeting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Meetings
    * const meetings = await prisma.meeting.findMany()
    * ```
    */
  get meeting(): Prisma.MeetingDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Lead: 'Lead',
    UploadBatch: 'UploadBatch',
    User: 'User',
    Meeting: 'Meeting'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "lead" | "uploadBatch" | "user" | "meeting"
      txIsolationLevel: never
    }
    model: {
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.LeadFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.LeadAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      UploadBatch: {
        payload: Prisma.$UploadBatchPayload<ExtArgs>
        fields: Prisma.UploadBatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UploadBatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadBatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UploadBatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadBatchPayload>
          }
          findFirst: {
            args: Prisma.UploadBatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadBatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UploadBatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadBatchPayload>
          }
          findMany: {
            args: Prisma.UploadBatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadBatchPayload>[]
          }
          create: {
            args: Prisma.UploadBatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadBatchPayload>
          }
          createMany: {
            args: Prisma.UploadBatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UploadBatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadBatchPayload>
          }
          update: {
            args: Prisma.UploadBatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadBatchPayload>
          }
          deleteMany: {
            args: Prisma.UploadBatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UploadBatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UploadBatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadBatchPayload>
          }
          aggregate: {
            args: Prisma.UploadBatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUploadBatch>
          }
          groupBy: {
            args: Prisma.UploadBatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<UploadBatchGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UploadBatchFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UploadBatchAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UploadBatchCountArgs<ExtArgs>
            result: $Utils.Optional<UploadBatchCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Meeting: {
        payload: Prisma.$MeetingPayload<ExtArgs>
        fields: Prisma.MeetingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MeetingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeetingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          findFirst: {
            args: Prisma.MeetingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeetingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          findMany: {
            args: Prisma.MeetingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>[]
          }
          create: {
            args: Prisma.MeetingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          createMany: {
            args: Prisma.MeetingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MeetingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          update: {
            args: Prisma.MeetingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          deleteMany: {
            args: Prisma.MeetingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MeetingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MeetingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          aggregate: {
            args: Prisma.MeetingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeeting>
          }
          groupBy: {
            args: Prisma.MeetingGroupByArgs<ExtArgs>
            result: $Utils.Optional<MeetingGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MeetingFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MeetingAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MeetingCountArgs<ExtArgs>
            result: $Utils.Optional<MeetingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LeadCountOutputType
   */

  export type LeadCountOutputType = {
    meetings: number
  }

  export type LeadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meetings?: boolean | LeadCountOutputTypeCountMeetingsArgs
  }

  // Custom InputTypes
  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCountOutputType
     */
    select?: LeadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountMeetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingWhereInput
  }


  /**
   * Count Type UploadBatchCountOutputType
   */

  export type UploadBatchCountOutputType = {
    leads: number
  }

  export type UploadBatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leads?: boolean | UploadBatchCountOutputTypeCountLeadsArgs
  }

  // Custom InputTypes
  /**
   * UploadBatchCountOutputType without action
   */
  export type UploadBatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadBatchCountOutputType
     */
    select?: UploadBatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UploadBatchCountOutputType without action
   */
  export type UploadBatchCountOutputTypeCountLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadAvgAggregateOutputType = {
    rowNum: number | null
  }

  export type LeadSumAggregateOutputType = {
    rowNum: number | null
  }

  export type LeadMinAggregateOutputType = {
    id: string | null
    rowNum: number | null
    prospectFullName: string | null
    prospectJobTitle: string | null
    prospectLinkedin: string | null
    businessName: string | null
    businessWebsite: string | null
    businessNumberOfEmployees: string | null
    businessYearlyRevenue: string | null
    businessCountry: string | null
    businessRegion: string | null
    businessNaicsDescription: string | null
    contactProfessionalEmail: string | null
    contactEmails: string | null
    contactMobilePhone: string | null
    contactPhoneNumbers: string | null
    prospectId: string | null
    businessId: string | null
    status: string | null
    remark: string | null
    uploadBatchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    originalCreatedAt: string | null
    rawData: string | null
    coldCallScript: string | null
  }

  export type LeadMaxAggregateOutputType = {
    id: string | null
    rowNum: number | null
    prospectFullName: string | null
    prospectJobTitle: string | null
    prospectLinkedin: string | null
    businessName: string | null
    businessWebsite: string | null
    businessNumberOfEmployees: string | null
    businessYearlyRevenue: string | null
    businessCountry: string | null
    businessRegion: string | null
    businessNaicsDescription: string | null
    contactProfessionalEmail: string | null
    contactEmails: string | null
    contactMobilePhone: string | null
    contactPhoneNumbers: string | null
    prospectId: string | null
    businessId: string | null
    status: string | null
    remark: string | null
    uploadBatchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    originalCreatedAt: string | null
    rawData: string | null
    coldCallScript: string | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    rowNum: number
    prospectFullName: number
    prospectJobTitle: number
    prospectLinkedin: number
    businessName: number
    businessWebsite: number
    businessNumberOfEmployees: number
    businessYearlyRevenue: number
    businessCountry: number
    businessRegion: number
    businessNaicsDescription: number
    contactProfessionalEmail: number
    contactEmails: number
    contactMobilePhone: number
    contactPhoneNumbers: number
    prospectId: number
    businessId: number
    status: number
    remark: number
    uploadBatchId: number
    createdAt: number
    updatedAt: number
    originalCreatedAt: number
    rawData: number
    coldCallScript: number
    _all: number
  }


  export type LeadAvgAggregateInputType = {
    rowNum?: true
  }

  export type LeadSumAggregateInputType = {
    rowNum?: true
  }

  export type LeadMinAggregateInputType = {
    id?: true
    rowNum?: true
    prospectFullName?: true
    prospectJobTitle?: true
    prospectLinkedin?: true
    businessName?: true
    businessWebsite?: true
    businessNumberOfEmployees?: true
    businessYearlyRevenue?: true
    businessCountry?: true
    businessRegion?: true
    businessNaicsDescription?: true
    contactProfessionalEmail?: true
    contactEmails?: true
    contactMobilePhone?: true
    contactPhoneNumbers?: true
    prospectId?: true
    businessId?: true
    status?: true
    remark?: true
    uploadBatchId?: true
    createdAt?: true
    updatedAt?: true
    originalCreatedAt?: true
    rawData?: true
    coldCallScript?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    rowNum?: true
    prospectFullName?: true
    prospectJobTitle?: true
    prospectLinkedin?: true
    businessName?: true
    businessWebsite?: true
    businessNumberOfEmployees?: true
    businessYearlyRevenue?: true
    businessCountry?: true
    businessRegion?: true
    businessNaicsDescription?: true
    contactProfessionalEmail?: true
    contactEmails?: true
    contactMobilePhone?: true
    contactPhoneNumbers?: true
    prospectId?: true
    businessId?: true
    status?: true
    remark?: true
    uploadBatchId?: true
    createdAt?: true
    updatedAt?: true
    originalCreatedAt?: true
    rawData?: true
    coldCallScript?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    rowNum?: true
    prospectFullName?: true
    prospectJobTitle?: true
    prospectLinkedin?: true
    businessName?: true
    businessWebsite?: true
    businessNumberOfEmployees?: true
    businessYearlyRevenue?: true
    businessCountry?: true
    businessRegion?: true
    businessNaicsDescription?: true
    contactProfessionalEmail?: true
    contactEmails?: true
    contactMobilePhone?: true
    contactPhoneNumbers?: true
    prospectId?: true
    businessId?: true
    status?: true
    remark?: true
    uploadBatchId?: true
    createdAt?: true
    updatedAt?: true
    originalCreatedAt?: true
    rawData?: true
    coldCallScript?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _avg?: LeadAvgAggregateInputType
    _sum?: LeadSumAggregateInputType
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: string
    rowNum: number | null
    prospectFullName: string
    prospectJobTitle: string | null
    prospectLinkedin: string | null
    businessName: string | null
    businessWebsite: string | null
    businessNumberOfEmployees: string | null
    businessYearlyRevenue: string | null
    businessCountry: string | null
    businessRegion: string | null
    businessNaicsDescription: string | null
    contactProfessionalEmail: string | null
    contactEmails: string | null
    contactMobilePhone: string | null
    contactPhoneNumbers: string | null
    prospectId: string | null
    businessId: string | null
    status: string
    remark: string | null
    uploadBatchId: string | null
    createdAt: Date
    updatedAt: Date
    originalCreatedAt: string | null
    rawData: string | null
    coldCallScript: string | null
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rowNum?: boolean
    prospectFullName?: boolean
    prospectJobTitle?: boolean
    prospectLinkedin?: boolean
    businessName?: boolean
    businessWebsite?: boolean
    businessNumberOfEmployees?: boolean
    businessYearlyRevenue?: boolean
    businessCountry?: boolean
    businessRegion?: boolean
    businessNaicsDescription?: boolean
    contactProfessionalEmail?: boolean
    contactEmails?: boolean
    contactMobilePhone?: boolean
    contactPhoneNumbers?: boolean
    prospectId?: boolean
    businessId?: boolean
    status?: boolean
    remark?: boolean
    uploadBatchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    originalCreatedAt?: boolean
    rawData?: boolean
    coldCallScript?: boolean
    uploadBatch?: boolean | Lead$uploadBatchArgs<ExtArgs>
    meetings?: boolean | Lead$meetingsArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>


  export type LeadSelectScalar = {
    id?: boolean
    rowNum?: boolean
    prospectFullName?: boolean
    prospectJobTitle?: boolean
    prospectLinkedin?: boolean
    businessName?: boolean
    businessWebsite?: boolean
    businessNumberOfEmployees?: boolean
    businessYearlyRevenue?: boolean
    businessCountry?: boolean
    businessRegion?: boolean
    businessNaicsDescription?: boolean
    contactProfessionalEmail?: boolean
    contactEmails?: boolean
    contactMobilePhone?: boolean
    contactPhoneNumbers?: boolean
    prospectId?: boolean
    businessId?: boolean
    status?: boolean
    remark?: boolean
    uploadBatchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    originalCreatedAt?: boolean
    rawData?: boolean
    coldCallScript?: boolean
  }

  export type LeadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadBatch?: boolean | Lead$uploadBatchArgs<ExtArgs>
    meetings?: boolean | Lead$meetingsArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {
      uploadBatch: Prisma.$UploadBatchPayload<ExtArgs> | null
      meetings: Prisma.$MeetingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rowNum: number | null
      prospectFullName: string
      prospectJobTitle: string | null
      prospectLinkedin: string | null
      businessName: string | null
      businessWebsite: string | null
      businessNumberOfEmployees: string | null
      businessYearlyRevenue: string | null
      businessCountry: string | null
      businessRegion: string | null
      businessNaicsDescription: string | null
      contactProfessionalEmail: string | null
      contactEmails: string | null
      contactMobilePhone: string | null
      contactPhoneNumbers: string | null
      prospectId: string | null
      businessId: string | null
      status: string
      remark: string | null
      uploadBatchId: string | null
      createdAt: Date
      updatedAt: Date
      originalCreatedAt: string | null
      rawData: string | null
      coldCallScript: string | null
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Leads that matches the filter.
     * @param {LeadFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const lead = await prisma.lead.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: LeadFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Lead.
     * @param {LeadAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const lead = await prisma.lead.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: LeadAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploadBatch<T extends Lead$uploadBatchArgs<ExtArgs> = {}>(args?: Subset<T, Lead$uploadBatchArgs<ExtArgs>>): Prisma__UploadBatchClient<$Result.GetResult<Prisma.$UploadBatchPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    meetings<T extends Lead$meetingsArgs<ExtArgs> = {}>(args?: Subset<T, Lead$meetingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lead model
   */ 
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'String'>
    readonly rowNum: FieldRef<"Lead", 'Int'>
    readonly prospectFullName: FieldRef<"Lead", 'String'>
    readonly prospectJobTitle: FieldRef<"Lead", 'String'>
    readonly prospectLinkedin: FieldRef<"Lead", 'String'>
    readonly businessName: FieldRef<"Lead", 'String'>
    readonly businessWebsite: FieldRef<"Lead", 'String'>
    readonly businessNumberOfEmployees: FieldRef<"Lead", 'String'>
    readonly businessYearlyRevenue: FieldRef<"Lead", 'String'>
    readonly businessCountry: FieldRef<"Lead", 'String'>
    readonly businessRegion: FieldRef<"Lead", 'String'>
    readonly businessNaicsDescription: FieldRef<"Lead", 'String'>
    readonly contactProfessionalEmail: FieldRef<"Lead", 'String'>
    readonly contactEmails: FieldRef<"Lead", 'String'>
    readonly contactMobilePhone: FieldRef<"Lead", 'String'>
    readonly contactPhoneNumbers: FieldRef<"Lead", 'String'>
    readonly prospectId: FieldRef<"Lead", 'String'>
    readonly businessId: FieldRef<"Lead", 'String'>
    readonly status: FieldRef<"Lead", 'String'>
    readonly remark: FieldRef<"Lead", 'String'>
    readonly uploadBatchId: FieldRef<"Lead", 'String'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
    readonly updatedAt: FieldRef<"Lead", 'DateTime'>
    readonly originalCreatedAt: FieldRef<"Lead", 'String'>
    readonly rawData: FieldRef<"Lead", 'String'>
    readonly coldCallScript: FieldRef<"Lead", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
  }

  /**
   * Lead findRaw
   */
  export type LeadFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Lead aggregateRaw
   */
  export type LeadAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Lead.uploadBatch
   */
  export type Lead$uploadBatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadBatch
     */
    select?: UploadBatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadBatchInclude<ExtArgs> | null
    where?: UploadBatchWhereInput
  }

  /**
   * Lead.meetings
   */
  export type Lead$meetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    where?: MeetingWhereInput
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    cursor?: MeetingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
  }


  /**
   * Model UploadBatch
   */

  export type AggregateUploadBatch = {
    _count: UploadBatchCountAggregateOutputType | null
    _avg: UploadBatchAvgAggregateOutputType | null
    _sum: UploadBatchSumAggregateOutputType | null
    _min: UploadBatchMinAggregateOutputType | null
    _max: UploadBatchMaxAggregateOutputType | null
  }

  export type UploadBatchAvgAggregateOutputType = {
    totalRecords: number | null
  }

  export type UploadBatchSumAggregateOutputType = {
    totalRecords: number | null
  }

  export type UploadBatchMinAggregateOutputType = {
    id: string | null
    fileName: string | null
    totalRecords: number | null
    uploadedAt: Date | null
    columnMapping: string | null
  }

  export type UploadBatchMaxAggregateOutputType = {
    id: string | null
    fileName: string | null
    totalRecords: number | null
    uploadedAt: Date | null
    columnMapping: string | null
  }

  export type UploadBatchCountAggregateOutputType = {
    id: number
    fileName: number
    totalRecords: number
    uploadedAt: number
    columnMapping: number
    _all: number
  }


  export type UploadBatchAvgAggregateInputType = {
    totalRecords?: true
  }

  export type UploadBatchSumAggregateInputType = {
    totalRecords?: true
  }

  export type UploadBatchMinAggregateInputType = {
    id?: true
    fileName?: true
    totalRecords?: true
    uploadedAt?: true
    columnMapping?: true
  }

  export type UploadBatchMaxAggregateInputType = {
    id?: true
    fileName?: true
    totalRecords?: true
    uploadedAt?: true
    columnMapping?: true
  }

  export type UploadBatchCountAggregateInputType = {
    id?: true
    fileName?: true
    totalRecords?: true
    uploadedAt?: true
    columnMapping?: true
    _all?: true
  }

  export type UploadBatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadBatch to aggregate.
     */
    where?: UploadBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadBatches to fetch.
     */
    orderBy?: UploadBatchOrderByWithRelationInput | UploadBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UploadBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UploadBatches
    **/
    _count?: true | UploadBatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UploadBatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UploadBatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UploadBatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UploadBatchMaxAggregateInputType
  }

  export type GetUploadBatchAggregateType<T extends UploadBatchAggregateArgs> = {
        [P in keyof T & keyof AggregateUploadBatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUploadBatch[P]>
      : GetScalarType<T[P], AggregateUploadBatch[P]>
  }




  export type UploadBatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadBatchWhereInput
    orderBy?: UploadBatchOrderByWithAggregationInput | UploadBatchOrderByWithAggregationInput[]
    by: UploadBatchScalarFieldEnum[] | UploadBatchScalarFieldEnum
    having?: UploadBatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UploadBatchCountAggregateInputType | true
    _avg?: UploadBatchAvgAggregateInputType
    _sum?: UploadBatchSumAggregateInputType
    _min?: UploadBatchMinAggregateInputType
    _max?: UploadBatchMaxAggregateInputType
  }

  export type UploadBatchGroupByOutputType = {
    id: string
    fileName: string
    totalRecords: number
    uploadedAt: Date
    columnMapping: string | null
    _count: UploadBatchCountAggregateOutputType | null
    _avg: UploadBatchAvgAggregateOutputType | null
    _sum: UploadBatchSumAggregateOutputType | null
    _min: UploadBatchMinAggregateOutputType | null
    _max: UploadBatchMaxAggregateOutputType | null
  }

  type GetUploadBatchGroupByPayload<T extends UploadBatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UploadBatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UploadBatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UploadBatchGroupByOutputType[P]>
            : GetScalarType<T[P], UploadBatchGroupByOutputType[P]>
        }
      >
    >


  export type UploadBatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    totalRecords?: boolean
    uploadedAt?: boolean
    columnMapping?: boolean
    leads?: boolean | UploadBatch$leadsArgs<ExtArgs>
    _count?: boolean | UploadBatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadBatch"]>


  export type UploadBatchSelectScalar = {
    id?: boolean
    fileName?: boolean
    totalRecords?: boolean
    uploadedAt?: boolean
    columnMapping?: boolean
  }

  export type UploadBatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leads?: boolean | UploadBatch$leadsArgs<ExtArgs>
    _count?: boolean | UploadBatchCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UploadBatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UploadBatch"
    objects: {
      leads: Prisma.$LeadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fileName: string
      totalRecords: number
      uploadedAt: Date
      columnMapping: string | null
    }, ExtArgs["result"]["uploadBatch"]>
    composites: {}
  }

  type UploadBatchGetPayload<S extends boolean | null | undefined | UploadBatchDefaultArgs> = $Result.GetResult<Prisma.$UploadBatchPayload, S>

  type UploadBatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UploadBatchFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UploadBatchCountAggregateInputType | true
    }

  export interface UploadBatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UploadBatch'], meta: { name: 'UploadBatch' } }
    /**
     * Find zero or one UploadBatch that matches the filter.
     * @param {UploadBatchFindUniqueArgs} args - Arguments to find a UploadBatch
     * @example
     * // Get one UploadBatch
     * const uploadBatch = await prisma.uploadBatch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UploadBatchFindUniqueArgs>(args: SelectSubset<T, UploadBatchFindUniqueArgs<ExtArgs>>): Prisma__UploadBatchClient<$Result.GetResult<Prisma.$UploadBatchPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UploadBatch that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UploadBatchFindUniqueOrThrowArgs} args - Arguments to find a UploadBatch
     * @example
     * // Get one UploadBatch
     * const uploadBatch = await prisma.uploadBatch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UploadBatchFindUniqueOrThrowArgs>(args: SelectSubset<T, UploadBatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UploadBatchClient<$Result.GetResult<Prisma.$UploadBatchPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UploadBatch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadBatchFindFirstArgs} args - Arguments to find a UploadBatch
     * @example
     * // Get one UploadBatch
     * const uploadBatch = await prisma.uploadBatch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UploadBatchFindFirstArgs>(args?: SelectSubset<T, UploadBatchFindFirstArgs<ExtArgs>>): Prisma__UploadBatchClient<$Result.GetResult<Prisma.$UploadBatchPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UploadBatch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadBatchFindFirstOrThrowArgs} args - Arguments to find a UploadBatch
     * @example
     * // Get one UploadBatch
     * const uploadBatch = await prisma.uploadBatch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UploadBatchFindFirstOrThrowArgs>(args?: SelectSubset<T, UploadBatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__UploadBatchClient<$Result.GetResult<Prisma.$UploadBatchPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UploadBatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadBatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UploadBatches
     * const uploadBatches = await prisma.uploadBatch.findMany()
     * 
     * // Get first 10 UploadBatches
     * const uploadBatches = await prisma.uploadBatch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uploadBatchWithIdOnly = await prisma.uploadBatch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UploadBatchFindManyArgs>(args?: SelectSubset<T, UploadBatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadBatchPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UploadBatch.
     * @param {UploadBatchCreateArgs} args - Arguments to create a UploadBatch.
     * @example
     * // Create one UploadBatch
     * const UploadBatch = await prisma.uploadBatch.create({
     *   data: {
     *     // ... data to create a UploadBatch
     *   }
     * })
     * 
     */
    create<T extends UploadBatchCreateArgs>(args: SelectSubset<T, UploadBatchCreateArgs<ExtArgs>>): Prisma__UploadBatchClient<$Result.GetResult<Prisma.$UploadBatchPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UploadBatches.
     * @param {UploadBatchCreateManyArgs} args - Arguments to create many UploadBatches.
     * @example
     * // Create many UploadBatches
     * const uploadBatch = await prisma.uploadBatch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UploadBatchCreateManyArgs>(args?: SelectSubset<T, UploadBatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UploadBatch.
     * @param {UploadBatchDeleteArgs} args - Arguments to delete one UploadBatch.
     * @example
     * // Delete one UploadBatch
     * const UploadBatch = await prisma.uploadBatch.delete({
     *   where: {
     *     // ... filter to delete one UploadBatch
     *   }
     * })
     * 
     */
    delete<T extends UploadBatchDeleteArgs>(args: SelectSubset<T, UploadBatchDeleteArgs<ExtArgs>>): Prisma__UploadBatchClient<$Result.GetResult<Prisma.$UploadBatchPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UploadBatch.
     * @param {UploadBatchUpdateArgs} args - Arguments to update one UploadBatch.
     * @example
     * // Update one UploadBatch
     * const uploadBatch = await prisma.uploadBatch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UploadBatchUpdateArgs>(args: SelectSubset<T, UploadBatchUpdateArgs<ExtArgs>>): Prisma__UploadBatchClient<$Result.GetResult<Prisma.$UploadBatchPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UploadBatches.
     * @param {UploadBatchDeleteManyArgs} args - Arguments to filter UploadBatches to delete.
     * @example
     * // Delete a few UploadBatches
     * const { count } = await prisma.uploadBatch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UploadBatchDeleteManyArgs>(args?: SelectSubset<T, UploadBatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadBatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadBatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UploadBatches
     * const uploadBatch = await prisma.uploadBatch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UploadBatchUpdateManyArgs>(args: SelectSubset<T, UploadBatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UploadBatch.
     * @param {UploadBatchUpsertArgs} args - Arguments to update or create a UploadBatch.
     * @example
     * // Update or create a UploadBatch
     * const uploadBatch = await prisma.uploadBatch.upsert({
     *   create: {
     *     // ... data to create a UploadBatch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UploadBatch we want to update
     *   }
     * })
     */
    upsert<T extends UploadBatchUpsertArgs>(args: SelectSubset<T, UploadBatchUpsertArgs<ExtArgs>>): Prisma__UploadBatchClient<$Result.GetResult<Prisma.$UploadBatchPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more UploadBatches that matches the filter.
     * @param {UploadBatchFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const uploadBatch = await prisma.uploadBatch.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: UploadBatchFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a UploadBatch.
     * @param {UploadBatchAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const uploadBatch = await prisma.uploadBatch.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UploadBatchAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of UploadBatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadBatchCountArgs} args - Arguments to filter UploadBatches to count.
     * @example
     * // Count the number of UploadBatches
     * const count = await prisma.uploadBatch.count({
     *   where: {
     *     // ... the filter for the UploadBatches we want to count
     *   }
     * })
    **/
    count<T extends UploadBatchCountArgs>(
      args?: Subset<T, UploadBatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UploadBatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UploadBatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadBatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UploadBatchAggregateArgs>(args: Subset<T, UploadBatchAggregateArgs>): Prisma.PrismaPromise<GetUploadBatchAggregateType<T>>

    /**
     * Group by UploadBatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadBatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UploadBatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UploadBatchGroupByArgs['orderBy'] }
        : { orderBy?: UploadBatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UploadBatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUploadBatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UploadBatch model
   */
  readonly fields: UploadBatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UploadBatch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UploadBatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leads<T extends UploadBatch$leadsArgs<ExtArgs> = {}>(args?: Subset<T, UploadBatch$leadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UploadBatch model
   */ 
  interface UploadBatchFieldRefs {
    readonly id: FieldRef<"UploadBatch", 'String'>
    readonly fileName: FieldRef<"UploadBatch", 'String'>
    readonly totalRecords: FieldRef<"UploadBatch", 'Int'>
    readonly uploadedAt: FieldRef<"UploadBatch", 'DateTime'>
    readonly columnMapping: FieldRef<"UploadBatch", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UploadBatch findUnique
   */
  export type UploadBatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadBatch
     */
    select?: UploadBatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadBatchInclude<ExtArgs> | null
    /**
     * Filter, which UploadBatch to fetch.
     */
    where: UploadBatchWhereUniqueInput
  }

  /**
   * UploadBatch findUniqueOrThrow
   */
  export type UploadBatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadBatch
     */
    select?: UploadBatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadBatchInclude<ExtArgs> | null
    /**
     * Filter, which UploadBatch to fetch.
     */
    where: UploadBatchWhereUniqueInput
  }

  /**
   * UploadBatch findFirst
   */
  export type UploadBatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadBatch
     */
    select?: UploadBatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadBatchInclude<ExtArgs> | null
    /**
     * Filter, which UploadBatch to fetch.
     */
    where?: UploadBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadBatches to fetch.
     */
    orderBy?: UploadBatchOrderByWithRelationInput | UploadBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadBatches.
     */
    cursor?: UploadBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadBatches.
     */
    distinct?: UploadBatchScalarFieldEnum | UploadBatchScalarFieldEnum[]
  }

  /**
   * UploadBatch findFirstOrThrow
   */
  export type UploadBatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadBatch
     */
    select?: UploadBatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadBatchInclude<ExtArgs> | null
    /**
     * Filter, which UploadBatch to fetch.
     */
    where?: UploadBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadBatches to fetch.
     */
    orderBy?: UploadBatchOrderByWithRelationInput | UploadBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadBatches.
     */
    cursor?: UploadBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadBatches.
     */
    distinct?: UploadBatchScalarFieldEnum | UploadBatchScalarFieldEnum[]
  }

  /**
   * UploadBatch findMany
   */
  export type UploadBatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadBatch
     */
    select?: UploadBatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadBatchInclude<ExtArgs> | null
    /**
     * Filter, which UploadBatches to fetch.
     */
    where?: UploadBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadBatches to fetch.
     */
    orderBy?: UploadBatchOrderByWithRelationInput | UploadBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UploadBatches.
     */
    cursor?: UploadBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadBatches.
     */
    skip?: number
    distinct?: UploadBatchScalarFieldEnum | UploadBatchScalarFieldEnum[]
  }

  /**
   * UploadBatch create
   */
  export type UploadBatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadBatch
     */
    select?: UploadBatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadBatchInclude<ExtArgs> | null
    /**
     * The data needed to create a UploadBatch.
     */
    data: XOR<UploadBatchCreateInput, UploadBatchUncheckedCreateInput>
  }

  /**
   * UploadBatch createMany
   */
  export type UploadBatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UploadBatches.
     */
    data: UploadBatchCreateManyInput | UploadBatchCreateManyInput[]
  }

  /**
   * UploadBatch update
   */
  export type UploadBatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadBatch
     */
    select?: UploadBatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadBatchInclude<ExtArgs> | null
    /**
     * The data needed to update a UploadBatch.
     */
    data: XOR<UploadBatchUpdateInput, UploadBatchUncheckedUpdateInput>
    /**
     * Choose, which UploadBatch to update.
     */
    where: UploadBatchWhereUniqueInput
  }

  /**
   * UploadBatch updateMany
   */
  export type UploadBatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UploadBatches.
     */
    data: XOR<UploadBatchUpdateManyMutationInput, UploadBatchUncheckedUpdateManyInput>
    /**
     * Filter which UploadBatches to update
     */
    where?: UploadBatchWhereInput
  }

  /**
   * UploadBatch upsert
   */
  export type UploadBatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadBatch
     */
    select?: UploadBatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadBatchInclude<ExtArgs> | null
    /**
     * The filter to search for the UploadBatch to update in case it exists.
     */
    where: UploadBatchWhereUniqueInput
    /**
     * In case the UploadBatch found by the `where` argument doesn't exist, create a new UploadBatch with this data.
     */
    create: XOR<UploadBatchCreateInput, UploadBatchUncheckedCreateInput>
    /**
     * In case the UploadBatch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UploadBatchUpdateInput, UploadBatchUncheckedUpdateInput>
  }

  /**
   * UploadBatch delete
   */
  export type UploadBatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadBatch
     */
    select?: UploadBatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadBatchInclude<ExtArgs> | null
    /**
     * Filter which UploadBatch to delete.
     */
    where: UploadBatchWhereUniqueInput
  }

  /**
   * UploadBatch deleteMany
   */
  export type UploadBatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadBatches to delete
     */
    where?: UploadBatchWhereInput
  }

  /**
   * UploadBatch findRaw
   */
  export type UploadBatchFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * UploadBatch aggregateRaw
   */
  export type UploadBatchAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * UploadBatch.leads
   */
  export type UploadBatch$leadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * UploadBatch without action
   */
  export type UploadBatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadBatch
     */
    select?: UploadBatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadBatchInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    role: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model Meeting
   */

  export type AggregateMeeting = {
    _count: MeetingCountAggregateOutputType | null
    _min: MeetingMinAggregateOutputType | null
    _max: MeetingMaxAggregateOutputType | null
  }

  export type MeetingMinAggregateOutputType = {
    id: string | null
    leadId: string | null
    title: string | null
    agenda: string | null
    scheduledAt: Date | null
    emailSent: boolean | null
    reminderSent: boolean | null
    recipientEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MeetingMaxAggregateOutputType = {
    id: string | null
    leadId: string | null
    title: string | null
    agenda: string | null
    scheduledAt: Date | null
    emailSent: boolean | null
    reminderSent: boolean | null
    recipientEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MeetingCountAggregateOutputType = {
    id: number
    leadId: number
    title: number
    agenda: number
    scheduledAt: number
    emailSent: number
    reminderSent: number
    recipientEmail: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MeetingMinAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    agenda?: true
    scheduledAt?: true
    emailSent?: true
    reminderSent?: true
    recipientEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MeetingMaxAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    agenda?: true
    scheduledAt?: true
    emailSent?: true
    reminderSent?: true
    recipientEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MeetingCountAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    agenda?: true
    scheduledAt?: true
    emailSent?: true
    reminderSent?: true
    recipientEmail?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MeetingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meeting to aggregate.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Meetings
    **/
    _count?: true | MeetingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeetingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeetingMaxAggregateInputType
  }

  export type GetMeetingAggregateType<T extends MeetingAggregateArgs> = {
        [P in keyof T & keyof AggregateMeeting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeeting[P]>
      : GetScalarType<T[P], AggregateMeeting[P]>
  }




  export type MeetingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingWhereInput
    orderBy?: MeetingOrderByWithAggregationInput | MeetingOrderByWithAggregationInput[]
    by: MeetingScalarFieldEnum[] | MeetingScalarFieldEnum
    having?: MeetingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeetingCountAggregateInputType | true
    _min?: MeetingMinAggregateInputType
    _max?: MeetingMaxAggregateInputType
  }

  export type MeetingGroupByOutputType = {
    id: string
    leadId: string
    title: string
    agenda: string | null
    scheduledAt: Date
    emailSent: boolean
    reminderSent: boolean
    recipientEmail: string | null
    createdAt: Date
    updatedAt: Date
    _count: MeetingCountAggregateOutputType | null
    _min: MeetingMinAggregateOutputType | null
    _max: MeetingMaxAggregateOutputType | null
  }

  type GetMeetingGroupByPayload<T extends MeetingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MeetingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeetingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeetingGroupByOutputType[P]>
            : GetScalarType<T[P], MeetingGroupByOutputType[P]>
        }
      >
    >


  export type MeetingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    title?: boolean
    agenda?: boolean
    scheduledAt?: boolean
    emailSent?: boolean
    reminderSent?: boolean
    recipientEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meeting"]>


  export type MeetingSelectScalar = {
    id?: boolean
    leadId?: boolean
    title?: boolean
    agenda?: boolean
    scheduledAt?: boolean
    emailSent?: boolean
    reminderSent?: boolean
    recipientEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MeetingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $MeetingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Meeting"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadId: string
      title: string
      agenda: string | null
      scheduledAt: Date
      emailSent: boolean
      reminderSent: boolean
      recipientEmail: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["meeting"]>
    composites: {}
  }

  type MeetingGetPayload<S extends boolean | null | undefined | MeetingDefaultArgs> = $Result.GetResult<Prisma.$MeetingPayload, S>

  type MeetingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MeetingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MeetingCountAggregateInputType | true
    }

  export interface MeetingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Meeting'], meta: { name: 'Meeting' } }
    /**
     * Find zero or one Meeting that matches the filter.
     * @param {MeetingFindUniqueArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeetingFindUniqueArgs>(args: SelectSubset<T, MeetingFindUniqueArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Meeting that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MeetingFindUniqueOrThrowArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeetingFindUniqueOrThrowArgs>(args: SelectSubset<T, MeetingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Meeting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindFirstArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeetingFindFirstArgs>(args?: SelectSubset<T, MeetingFindFirstArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Meeting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindFirstOrThrowArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeetingFindFirstOrThrowArgs>(args?: SelectSubset<T, MeetingFindFirstOrThrowArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Meetings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Meetings
     * const meetings = await prisma.meeting.findMany()
     * 
     * // Get first 10 Meetings
     * const meetings = await prisma.meeting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const meetingWithIdOnly = await prisma.meeting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MeetingFindManyArgs>(args?: SelectSubset<T, MeetingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Meeting.
     * @param {MeetingCreateArgs} args - Arguments to create a Meeting.
     * @example
     * // Create one Meeting
     * const Meeting = await prisma.meeting.create({
     *   data: {
     *     // ... data to create a Meeting
     *   }
     * })
     * 
     */
    create<T extends MeetingCreateArgs>(args: SelectSubset<T, MeetingCreateArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Meetings.
     * @param {MeetingCreateManyArgs} args - Arguments to create many Meetings.
     * @example
     * // Create many Meetings
     * const meeting = await prisma.meeting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MeetingCreateManyArgs>(args?: SelectSubset<T, MeetingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Meeting.
     * @param {MeetingDeleteArgs} args - Arguments to delete one Meeting.
     * @example
     * // Delete one Meeting
     * const Meeting = await prisma.meeting.delete({
     *   where: {
     *     // ... filter to delete one Meeting
     *   }
     * })
     * 
     */
    delete<T extends MeetingDeleteArgs>(args: SelectSubset<T, MeetingDeleteArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Meeting.
     * @param {MeetingUpdateArgs} args - Arguments to update one Meeting.
     * @example
     * // Update one Meeting
     * const meeting = await prisma.meeting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MeetingUpdateArgs>(args: SelectSubset<T, MeetingUpdateArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Meetings.
     * @param {MeetingDeleteManyArgs} args - Arguments to filter Meetings to delete.
     * @example
     * // Delete a few Meetings
     * const { count } = await prisma.meeting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MeetingDeleteManyArgs>(args?: SelectSubset<T, MeetingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Meetings
     * const meeting = await prisma.meeting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MeetingUpdateManyArgs>(args: SelectSubset<T, MeetingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Meeting.
     * @param {MeetingUpsertArgs} args - Arguments to update or create a Meeting.
     * @example
     * // Update or create a Meeting
     * const meeting = await prisma.meeting.upsert({
     *   create: {
     *     // ... data to create a Meeting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Meeting we want to update
     *   }
     * })
     */
    upsert<T extends MeetingUpsertArgs>(args: SelectSubset<T, MeetingUpsertArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Meetings that matches the filter.
     * @param {MeetingFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const meeting = await prisma.meeting.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: MeetingFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Meeting.
     * @param {MeetingAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const meeting = await prisma.meeting.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MeetingAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Meetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingCountArgs} args - Arguments to filter Meetings to count.
     * @example
     * // Count the number of Meetings
     * const count = await prisma.meeting.count({
     *   where: {
     *     // ... the filter for the Meetings we want to count
     *   }
     * })
    **/
    count<T extends MeetingCountArgs>(
      args?: Subset<T, MeetingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeetingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Meeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MeetingAggregateArgs>(args: Subset<T, MeetingAggregateArgs>): Prisma.PrismaPromise<GetMeetingAggregateType<T>>

    /**
     * Group by Meeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MeetingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeetingGroupByArgs['orderBy'] }
        : { orderBy?: MeetingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MeetingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeetingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Meeting model
   */
  readonly fields: MeetingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Meeting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MeetingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Meeting model
   */ 
  interface MeetingFieldRefs {
    readonly id: FieldRef<"Meeting", 'String'>
    readonly leadId: FieldRef<"Meeting", 'String'>
    readonly title: FieldRef<"Meeting", 'String'>
    readonly agenda: FieldRef<"Meeting", 'String'>
    readonly scheduledAt: FieldRef<"Meeting", 'DateTime'>
    readonly emailSent: FieldRef<"Meeting", 'Boolean'>
    readonly reminderSent: FieldRef<"Meeting", 'Boolean'>
    readonly recipientEmail: FieldRef<"Meeting", 'String'>
    readonly createdAt: FieldRef<"Meeting", 'DateTime'>
    readonly updatedAt: FieldRef<"Meeting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Meeting findUnique
   */
  export type MeetingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting findUniqueOrThrow
   */
  export type MeetingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting findFirst
   */
  export type MeetingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meetings.
     */
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting findFirstOrThrow
   */
  export type MeetingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meetings.
     */
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting findMany
   */
  export type MeetingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meetings to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting create
   */
  export type MeetingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The data needed to create a Meeting.
     */
    data: XOR<MeetingCreateInput, MeetingUncheckedCreateInput>
  }

  /**
   * Meeting createMany
   */
  export type MeetingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Meetings.
     */
    data: MeetingCreateManyInput | MeetingCreateManyInput[]
  }

  /**
   * Meeting update
   */
  export type MeetingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The data needed to update a Meeting.
     */
    data: XOR<MeetingUpdateInput, MeetingUncheckedUpdateInput>
    /**
     * Choose, which Meeting to update.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting updateMany
   */
  export type MeetingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Meetings.
     */
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyInput>
    /**
     * Filter which Meetings to update
     */
    where?: MeetingWhereInput
  }

  /**
   * Meeting upsert
   */
  export type MeetingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The filter to search for the Meeting to update in case it exists.
     */
    where: MeetingWhereUniqueInput
    /**
     * In case the Meeting found by the `where` argument doesn't exist, create a new Meeting with this data.
     */
    create: XOR<MeetingCreateInput, MeetingUncheckedCreateInput>
    /**
     * In case the Meeting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeetingUpdateInput, MeetingUncheckedUpdateInput>
  }

  /**
   * Meeting delete
   */
  export type MeetingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter which Meeting to delete.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting deleteMany
   */
  export type MeetingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meetings to delete
     */
    where?: MeetingWhereInput
  }

  /**
   * Meeting findRaw
   */
  export type MeetingFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Meeting aggregateRaw
   */
  export type MeetingAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Meeting without action
   */
  export type MeetingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const LeadScalarFieldEnum: {
    id: 'id',
    rowNum: 'rowNum',
    prospectFullName: 'prospectFullName',
    prospectJobTitle: 'prospectJobTitle',
    prospectLinkedin: 'prospectLinkedin',
    businessName: 'businessName',
    businessWebsite: 'businessWebsite',
    businessNumberOfEmployees: 'businessNumberOfEmployees',
    businessYearlyRevenue: 'businessYearlyRevenue',
    businessCountry: 'businessCountry',
    businessRegion: 'businessRegion',
    businessNaicsDescription: 'businessNaicsDescription',
    contactProfessionalEmail: 'contactProfessionalEmail',
    contactEmails: 'contactEmails',
    contactMobilePhone: 'contactMobilePhone',
    contactPhoneNumbers: 'contactPhoneNumbers',
    prospectId: 'prospectId',
    businessId: 'businessId',
    status: 'status',
    remark: 'remark',
    uploadBatchId: 'uploadBatchId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    originalCreatedAt: 'originalCreatedAt',
    rawData: 'rawData',
    coldCallScript: 'coldCallScript'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const UploadBatchScalarFieldEnum: {
    id: 'id',
    fileName: 'fileName',
    totalRecords: 'totalRecords',
    uploadedAt: 'uploadedAt',
    columnMapping: 'columnMapping'
  };

  export type UploadBatchScalarFieldEnum = (typeof UploadBatchScalarFieldEnum)[keyof typeof UploadBatchScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MeetingScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    title: 'title',
    agenda: 'agenda',
    scheduledAt: 'scheduledAt',
    emailSent: 'emailSent',
    reminderSent: 'reminderSent',
    recipientEmail: 'recipientEmail',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MeetingScalarFieldEnum = (typeof MeetingScalarFieldEnum)[keyof typeof MeetingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: StringFilter<"Lead"> | string
    rowNum?: IntNullableFilter<"Lead"> | number | null
    prospectFullName?: StringFilter<"Lead"> | string
    prospectJobTitle?: StringNullableFilter<"Lead"> | string | null
    prospectLinkedin?: StringNullableFilter<"Lead"> | string | null
    businessName?: StringNullableFilter<"Lead"> | string | null
    businessWebsite?: StringNullableFilter<"Lead"> | string | null
    businessNumberOfEmployees?: StringNullableFilter<"Lead"> | string | null
    businessYearlyRevenue?: StringNullableFilter<"Lead"> | string | null
    businessCountry?: StringNullableFilter<"Lead"> | string | null
    businessRegion?: StringNullableFilter<"Lead"> | string | null
    businessNaicsDescription?: StringNullableFilter<"Lead"> | string | null
    contactProfessionalEmail?: StringNullableFilter<"Lead"> | string | null
    contactEmails?: StringNullableFilter<"Lead"> | string | null
    contactMobilePhone?: StringNullableFilter<"Lead"> | string | null
    contactPhoneNumbers?: StringNullableFilter<"Lead"> | string | null
    prospectId?: StringNullableFilter<"Lead"> | string | null
    businessId?: StringNullableFilter<"Lead"> | string | null
    status?: StringFilter<"Lead"> | string
    remark?: StringNullableFilter<"Lead"> | string | null
    uploadBatchId?: StringNullableFilter<"Lead"> | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    originalCreatedAt?: StringNullableFilter<"Lead"> | string | null
    rawData?: StringNullableFilter<"Lead"> | string | null
    coldCallScript?: StringNullableFilter<"Lead"> | string | null
    uploadBatch?: XOR<UploadBatchNullableRelationFilter, UploadBatchWhereInput> | null
    meetings?: MeetingListRelationFilter
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    rowNum?: SortOrder
    prospectFullName?: SortOrder
    prospectJobTitle?: SortOrder
    prospectLinkedin?: SortOrder
    businessName?: SortOrder
    businessWebsite?: SortOrder
    businessNumberOfEmployees?: SortOrder
    businessYearlyRevenue?: SortOrder
    businessCountry?: SortOrder
    businessRegion?: SortOrder
    businessNaicsDescription?: SortOrder
    contactProfessionalEmail?: SortOrder
    contactEmails?: SortOrder
    contactMobilePhone?: SortOrder
    contactPhoneNumbers?: SortOrder
    prospectId?: SortOrder
    businessId?: SortOrder
    status?: SortOrder
    remark?: SortOrder
    uploadBatchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    originalCreatedAt?: SortOrder
    rawData?: SortOrder
    coldCallScript?: SortOrder
    uploadBatch?: UploadBatchOrderByWithRelationInput
    meetings?: MeetingOrderByRelationAggregateInput
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    rowNum?: IntNullableFilter<"Lead"> | number | null
    prospectFullName?: StringFilter<"Lead"> | string
    prospectJobTitle?: StringNullableFilter<"Lead"> | string | null
    prospectLinkedin?: StringNullableFilter<"Lead"> | string | null
    businessName?: StringNullableFilter<"Lead"> | string | null
    businessWebsite?: StringNullableFilter<"Lead"> | string | null
    businessNumberOfEmployees?: StringNullableFilter<"Lead"> | string | null
    businessYearlyRevenue?: StringNullableFilter<"Lead"> | string | null
    businessCountry?: StringNullableFilter<"Lead"> | string | null
    businessRegion?: StringNullableFilter<"Lead"> | string | null
    businessNaicsDescription?: StringNullableFilter<"Lead"> | string | null
    contactProfessionalEmail?: StringNullableFilter<"Lead"> | string | null
    contactEmails?: StringNullableFilter<"Lead"> | string | null
    contactMobilePhone?: StringNullableFilter<"Lead"> | string | null
    contactPhoneNumbers?: StringNullableFilter<"Lead"> | string | null
    prospectId?: StringNullableFilter<"Lead"> | string | null
    businessId?: StringNullableFilter<"Lead"> | string | null
    status?: StringFilter<"Lead"> | string
    remark?: StringNullableFilter<"Lead"> | string | null
    uploadBatchId?: StringNullableFilter<"Lead"> | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    originalCreatedAt?: StringNullableFilter<"Lead"> | string | null
    rawData?: StringNullableFilter<"Lead"> | string | null
    coldCallScript?: StringNullableFilter<"Lead"> | string | null
    uploadBatch?: XOR<UploadBatchNullableRelationFilter, UploadBatchWhereInput> | null
    meetings?: MeetingListRelationFilter
  }, "id">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    rowNum?: SortOrder
    prospectFullName?: SortOrder
    prospectJobTitle?: SortOrder
    prospectLinkedin?: SortOrder
    businessName?: SortOrder
    businessWebsite?: SortOrder
    businessNumberOfEmployees?: SortOrder
    businessYearlyRevenue?: SortOrder
    businessCountry?: SortOrder
    businessRegion?: SortOrder
    businessNaicsDescription?: SortOrder
    contactProfessionalEmail?: SortOrder
    contactEmails?: SortOrder
    contactMobilePhone?: SortOrder
    contactPhoneNumbers?: SortOrder
    prospectId?: SortOrder
    businessId?: SortOrder
    status?: SortOrder
    remark?: SortOrder
    uploadBatchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    originalCreatedAt?: SortOrder
    rawData?: SortOrder
    coldCallScript?: SortOrder
    _count?: LeadCountOrderByAggregateInput
    _avg?: LeadAvgOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
    _sum?: LeadSumOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lead"> | string
    rowNum?: IntNullableWithAggregatesFilter<"Lead"> | number | null
    prospectFullName?: StringWithAggregatesFilter<"Lead"> | string
    prospectJobTitle?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    prospectLinkedin?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    businessName?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    businessWebsite?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    businessNumberOfEmployees?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    businessYearlyRevenue?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    businessCountry?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    businessRegion?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    businessNaicsDescription?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    contactProfessionalEmail?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    contactEmails?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    contactMobilePhone?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    contactPhoneNumbers?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    prospectId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    businessId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    status?: StringWithAggregatesFilter<"Lead"> | string
    remark?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    uploadBatchId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    originalCreatedAt?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    rawData?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    coldCallScript?: StringNullableWithAggregatesFilter<"Lead"> | string | null
  }

  export type UploadBatchWhereInput = {
    AND?: UploadBatchWhereInput | UploadBatchWhereInput[]
    OR?: UploadBatchWhereInput[]
    NOT?: UploadBatchWhereInput | UploadBatchWhereInput[]
    id?: StringFilter<"UploadBatch"> | string
    fileName?: StringFilter<"UploadBatch"> | string
    totalRecords?: IntFilter<"UploadBatch"> | number
    uploadedAt?: DateTimeFilter<"UploadBatch"> | Date | string
    columnMapping?: StringNullableFilter<"UploadBatch"> | string | null
    leads?: LeadListRelationFilter
  }

  export type UploadBatchOrderByWithRelationInput = {
    id?: SortOrder
    fileName?: SortOrder
    totalRecords?: SortOrder
    uploadedAt?: SortOrder
    columnMapping?: SortOrder
    leads?: LeadOrderByRelationAggregateInput
  }

  export type UploadBatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UploadBatchWhereInput | UploadBatchWhereInput[]
    OR?: UploadBatchWhereInput[]
    NOT?: UploadBatchWhereInput | UploadBatchWhereInput[]
    fileName?: StringFilter<"UploadBatch"> | string
    totalRecords?: IntFilter<"UploadBatch"> | number
    uploadedAt?: DateTimeFilter<"UploadBatch"> | Date | string
    columnMapping?: StringNullableFilter<"UploadBatch"> | string | null
    leads?: LeadListRelationFilter
  }, "id">

  export type UploadBatchOrderByWithAggregationInput = {
    id?: SortOrder
    fileName?: SortOrder
    totalRecords?: SortOrder
    uploadedAt?: SortOrder
    columnMapping?: SortOrder
    _count?: UploadBatchCountOrderByAggregateInput
    _avg?: UploadBatchAvgOrderByAggregateInput
    _max?: UploadBatchMaxOrderByAggregateInput
    _min?: UploadBatchMinOrderByAggregateInput
    _sum?: UploadBatchSumOrderByAggregateInput
  }

  export type UploadBatchScalarWhereWithAggregatesInput = {
    AND?: UploadBatchScalarWhereWithAggregatesInput | UploadBatchScalarWhereWithAggregatesInput[]
    OR?: UploadBatchScalarWhereWithAggregatesInput[]
    NOT?: UploadBatchScalarWhereWithAggregatesInput | UploadBatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UploadBatch"> | string
    fileName?: StringWithAggregatesFilter<"UploadBatch"> | string
    totalRecords?: IntWithAggregatesFilter<"UploadBatch"> | number
    uploadedAt?: DateTimeWithAggregatesFilter<"UploadBatch"> | Date | string
    columnMapping?: StringNullableWithAggregatesFilter<"UploadBatch"> | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MeetingWhereInput = {
    AND?: MeetingWhereInput | MeetingWhereInput[]
    OR?: MeetingWhereInput[]
    NOT?: MeetingWhereInput | MeetingWhereInput[]
    id?: StringFilter<"Meeting"> | string
    leadId?: StringFilter<"Meeting"> | string
    title?: StringFilter<"Meeting"> | string
    agenda?: StringNullableFilter<"Meeting"> | string | null
    scheduledAt?: DateTimeFilter<"Meeting"> | Date | string
    emailSent?: BoolFilter<"Meeting"> | boolean
    reminderSent?: BoolFilter<"Meeting"> | boolean
    recipientEmail?: StringNullableFilter<"Meeting"> | string | null
    createdAt?: DateTimeFilter<"Meeting"> | Date | string
    updatedAt?: DateTimeFilter<"Meeting"> | Date | string
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }

  export type MeetingOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    agenda?: SortOrder
    scheduledAt?: SortOrder
    emailSent?: SortOrder
    reminderSent?: SortOrder
    recipientEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type MeetingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MeetingWhereInput | MeetingWhereInput[]
    OR?: MeetingWhereInput[]
    NOT?: MeetingWhereInput | MeetingWhereInput[]
    leadId?: StringFilter<"Meeting"> | string
    title?: StringFilter<"Meeting"> | string
    agenda?: StringNullableFilter<"Meeting"> | string | null
    scheduledAt?: DateTimeFilter<"Meeting"> | Date | string
    emailSent?: BoolFilter<"Meeting"> | boolean
    reminderSent?: BoolFilter<"Meeting"> | boolean
    recipientEmail?: StringNullableFilter<"Meeting"> | string | null
    createdAt?: DateTimeFilter<"Meeting"> | Date | string
    updatedAt?: DateTimeFilter<"Meeting"> | Date | string
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }, "id">

  export type MeetingOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    agenda?: SortOrder
    scheduledAt?: SortOrder
    emailSent?: SortOrder
    reminderSent?: SortOrder
    recipientEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MeetingCountOrderByAggregateInput
    _max?: MeetingMaxOrderByAggregateInput
    _min?: MeetingMinOrderByAggregateInput
  }

  export type MeetingScalarWhereWithAggregatesInput = {
    AND?: MeetingScalarWhereWithAggregatesInput | MeetingScalarWhereWithAggregatesInput[]
    OR?: MeetingScalarWhereWithAggregatesInput[]
    NOT?: MeetingScalarWhereWithAggregatesInput | MeetingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Meeting"> | string
    leadId?: StringWithAggregatesFilter<"Meeting"> | string
    title?: StringWithAggregatesFilter<"Meeting"> | string
    agenda?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    scheduledAt?: DateTimeWithAggregatesFilter<"Meeting"> | Date | string
    emailSent?: BoolWithAggregatesFilter<"Meeting"> | boolean
    reminderSent?: BoolWithAggregatesFilter<"Meeting"> | boolean
    recipientEmail?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Meeting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Meeting"> | Date | string
  }

  export type LeadCreateInput = {
    id?: string
    rowNum?: number | null
    prospectFullName: string
    prospectJobTitle?: string | null
    prospectLinkedin?: string | null
    businessName?: string | null
    businessWebsite?: string | null
    businessNumberOfEmployees?: string | null
    businessYearlyRevenue?: string | null
    businessCountry?: string | null
    businessRegion?: string | null
    businessNaicsDescription?: string | null
    contactProfessionalEmail?: string | null
    contactEmails?: string | null
    contactMobilePhone?: string | null
    contactPhoneNumbers?: string | null
    prospectId?: string | null
    businessId?: string | null
    status?: string
    remark?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    originalCreatedAt?: string | null
    rawData?: string | null
    coldCallScript?: string | null
    uploadBatch?: UploadBatchCreateNestedOneWithoutLeadsInput
    meetings?: MeetingCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateInput = {
    id?: string
    rowNum?: number | null
    prospectFullName: string
    prospectJobTitle?: string | null
    prospectLinkedin?: string | null
    businessName?: string | null
    businessWebsite?: string | null
    businessNumberOfEmployees?: string | null
    businessYearlyRevenue?: string | null
    businessCountry?: string | null
    businessRegion?: string | null
    businessNaicsDescription?: string | null
    contactProfessionalEmail?: string | null
    contactEmails?: string | null
    contactMobilePhone?: string | null
    contactPhoneNumbers?: string | null
    prospectId?: string | null
    businessId?: string | null
    status?: string
    remark?: string | null
    uploadBatchId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    originalCreatedAt?: string | null
    rawData?: string | null
    coldCallScript?: string | null
    meetings?: MeetingUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadUpdateInput = {
    rowNum?: NullableIntFieldUpdateOperationsInput | number | null
    prospectFullName?: StringFieldUpdateOperationsInput | string
    prospectJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    prospectLinkedin?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    businessWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    businessNumberOfEmployees?: NullableStringFieldUpdateOperationsInput | string | null
    businessYearlyRevenue?: NullableStringFieldUpdateOperationsInput | string | null
    businessCountry?: NullableStringFieldUpdateOperationsInput | string | null
    businessRegion?: NullableStringFieldUpdateOperationsInput | string | null
    businessNaicsDescription?: NullableStringFieldUpdateOperationsInput | string | null
    contactProfessionalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmails?: NullableStringFieldUpdateOperationsInput | string | null
    contactMobilePhone?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhoneNumbers?: NullableStringFieldUpdateOperationsInput | string | null
    prospectId?: NullableStringFieldUpdateOperationsInput | string | null
    businessId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalCreatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    coldCallScript?: NullableStringFieldUpdateOperationsInput | string | null
    uploadBatch?: UploadBatchUpdateOneWithoutLeadsNestedInput
    meetings?: MeetingUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateInput = {
    rowNum?: NullableIntFieldUpdateOperationsInput | number | null
    prospectFullName?: StringFieldUpdateOperationsInput | string
    prospectJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    prospectLinkedin?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    businessWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    businessNumberOfEmployees?: NullableStringFieldUpdateOperationsInput | string | null
    businessYearlyRevenue?: NullableStringFieldUpdateOperationsInput | string | null
    businessCountry?: NullableStringFieldUpdateOperationsInput | string | null
    businessRegion?: NullableStringFieldUpdateOperationsInput | string | null
    businessNaicsDescription?: NullableStringFieldUpdateOperationsInput | string | null
    contactProfessionalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmails?: NullableStringFieldUpdateOperationsInput | string | null
    contactMobilePhone?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhoneNumbers?: NullableStringFieldUpdateOperationsInput | string | null
    prospectId?: NullableStringFieldUpdateOperationsInput | string | null
    businessId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    uploadBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalCreatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    coldCallScript?: NullableStringFieldUpdateOperationsInput | string | null
    meetings?: MeetingUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateManyInput = {
    id?: string
    rowNum?: number | null
    prospectFullName: string
    prospectJobTitle?: string | null
    prospectLinkedin?: string | null
    businessName?: string | null
    businessWebsite?: string | null
    businessNumberOfEmployees?: string | null
    businessYearlyRevenue?: string | null
    businessCountry?: string | null
    businessRegion?: string | null
    businessNaicsDescription?: string | null
    contactProfessionalEmail?: string | null
    contactEmails?: string | null
    contactMobilePhone?: string | null
    contactPhoneNumbers?: string | null
    prospectId?: string | null
    businessId?: string | null
    status?: string
    remark?: string | null
    uploadBatchId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    originalCreatedAt?: string | null
    rawData?: string | null
    coldCallScript?: string | null
  }

  export type LeadUpdateManyMutationInput = {
    rowNum?: NullableIntFieldUpdateOperationsInput | number | null
    prospectFullName?: StringFieldUpdateOperationsInput | string
    prospectJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    prospectLinkedin?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    businessWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    businessNumberOfEmployees?: NullableStringFieldUpdateOperationsInput | string | null
    businessYearlyRevenue?: NullableStringFieldUpdateOperationsInput | string | null
    businessCountry?: NullableStringFieldUpdateOperationsInput | string | null
    businessRegion?: NullableStringFieldUpdateOperationsInput | string | null
    businessNaicsDescription?: NullableStringFieldUpdateOperationsInput | string | null
    contactProfessionalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmails?: NullableStringFieldUpdateOperationsInput | string | null
    contactMobilePhone?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhoneNumbers?: NullableStringFieldUpdateOperationsInput | string | null
    prospectId?: NullableStringFieldUpdateOperationsInput | string | null
    businessId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalCreatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    coldCallScript?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadUncheckedUpdateManyInput = {
    rowNum?: NullableIntFieldUpdateOperationsInput | number | null
    prospectFullName?: StringFieldUpdateOperationsInput | string
    prospectJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    prospectLinkedin?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    businessWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    businessNumberOfEmployees?: NullableStringFieldUpdateOperationsInput | string | null
    businessYearlyRevenue?: NullableStringFieldUpdateOperationsInput | string | null
    businessCountry?: NullableStringFieldUpdateOperationsInput | string | null
    businessRegion?: NullableStringFieldUpdateOperationsInput | string | null
    businessNaicsDescription?: NullableStringFieldUpdateOperationsInput | string | null
    contactProfessionalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmails?: NullableStringFieldUpdateOperationsInput | string | null
    contactMobilePhone?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhoneNumbers?: NullableStringFieldUpdateOperationsInput | string | null
    prospectId?: NullableStringFieldUpdateOperationsInput | string | null
    businessId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    uploadBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalCreatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    coldCallScript?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UploadBatchCreateInput = {
    id?: string
    fileName: string
    totalRecords: number
    uploadedAt?: Date | string
    columnMapping?: string | null
    leads?: LeadCreateNestedManyWithoutUploadBatchInput
  }

  export type UploadBatchUncheckedCreateInput = {
    id?: string
    fileName: string
    totalRecords: number
    uploadedAt?: Date | string
    columnMapping?: string | null
    leads?: LeadUncheckedCreateNestedManyWithoutUploadBatchInput
  }

  export type UploadBatchUpdateInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    columnMapping?: NullableStringFieldUpdateOperationsInput | string | null
    leads?: LeadUpdateManyWithoutUploadBatchNestedInput
  }

  export type UploadBatchUncheckedUpdateInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    columnMapping?: NullableStringFieldUpdateOperationsInput | string | null
    leads?: LeadUncheckedUpdateManyWithoutUploadBatchNestedInput
  }

  export type UploadBatchCreateManyInput = {
    id?: string
    fileName: string
    totalRecords: number
    uploadedAt?: Date | string
    columnMapping?: string | null
  }

  export type UploadBatchUpdateManyMutationInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    columnMapping?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UploadBatchUncheckedUpdateManyInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    columnMapping?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingCreateInput = {
    id?: string
    title: string
    agenda?: string | null
    scheduledAt: Date | string
    emailSent?: boolean
    reminderSent?: boolean
    recipientEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lead: LeadCreateNestedOneWithoutMeetingsInput
  }

  export type MeetingUncheckedCreateInput = {
    id?: string
    leadId: string
    title: string
    agenda?: string | null
    scheduledAt: Date | string
    emailSent?: boolean
    reminderSent?: boolean
    recipientEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MeetingUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    reminderSent?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutMeetingsNestedInput
  }

  export type MeetingUncheckedUpdateInput = {
    leadId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    reminderSent?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingCreateManyInput = {
    id?: string
    leadId: string
    title: string
    agenda?: string | null
    scheduledAt: Date | string
    emailSent?: boolean
    reminderSent?: boolean
    recipientEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MeetingUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    reminderSent?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingUncheckedUpdateManyInput = {
    leadId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    reminderSent?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UploadBatchNullableRelationFilter = {
    is?: UploadBatchWhereInput | null
    isNot?: UploadBatchWhereInput | null
  }

  export type MeetingListRelationFilter = {
    every?: MeetingWhereInput
    some?: MeetingWhereInput
    none?: MeetingWhereInput
  }

  export type MeetingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    rowNum?: SortOrder
    prospectFullName?: SortOrder
    prospectJobTitle?: SortOrder
    prospectLinkedin?: SortOrder
    businessName?: SortOrder
    businessWebsite?: SortOrder
    businessNumberOfEmployees?: SortOrder
    businessYearlyRevenue?: SortOrder
    businessCountry?: SortOrder
    businessRegion?: SortOrder
    businessNaicsDescription?: SortOrder
    contactProfessionalEmail?: SortOrder
    contactEmails?: SortOrder
    contactMobilePhone?: SortOrder
    contactPhoneNumbers?: SortOrder
    prospectId?: SortOrder
    businessId?: SortOrder
    status?: SortOrder
    remark?: SortOrder
    uploadBatchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    originalCreatedAt?: SortOrder
    rawData?: SortOrder
    coldCallScript?: SortOrder
  }

  export type LeadAvgOrderByAggregateInput = {
    rowNum?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    rowNum?: SortOrder
    prospectFullName?: SortOrder
    prospectJobTitle?: SortOrder
    prospectLinkedin?: SortOrder
    businessName?: SortOrder
    businessWebsite?: SortOrder
    businessNumberOfEmployees?: SortOrder
    businessYearlyRevenue?: SortOrder
    businessCountry?: SortOrder
    businessRegion?: SortOrder
    businessNaicsDescription?: SortOrder
    contactProfessionalEmail?: SortOrder
    contactEmails?: SortOrder
    contactMobilePhone?: SortOrder
    contactPhoneNumbers?: SortOrder
    prospectId?: SortOrder
    businessId?: SortOrder
    status?: SortOrder
    remark?: SortOrder
    uploadBatchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    originalCreatedAt?: SortOrder
    rawData?: SortOrder
    coldCallScript?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    rowNum?: SortOrder
    prospectFullName?: SortOrder
    prospectJobTitle?: SortOrder
    prospectLinkedin?: SortOrder
    businessName?: SortOrder
    businessWebsite?: SortOrder
    businessNumberOfEmployees?: SortOrder
    businessYearlyRevenue?: SortOrder
    businessCountry?: SortOrder
    businessRegion?: SortOrder
    businessNaicsDescription?: SortOrder
    contactProfessionalEmail?: SortOrder
    contactEmails?: SortOrder
    contactMobilePhone?: SortOrder
    contactPhoneNumbers?: SortOrder
    prospectId?: SortOrder
    businessId?: SortOrder
    status?: SortOrder
    remark?: SortOrder
    uploadBatchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    originalCreatedAt?: SortOrder
    rawData?: SortOrder
    coldCallScript?: SortOrder
  }

  export type LeadSumOrderByAggregateInput = {
    rowNum?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type LeadListRelationFilter = {
    every?: LeadWhereInput
    some?: LeadWhereInput
    none?: LeadWhereInput
  }

  export type LeadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UploadBatchCountOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    totalRecords?: SortOrder
    uploadedAt?: SortOrder
    columnMapping?: SortOrder
  }

  export type UploadBatchAvgOrderByAggregateInput = {
    totalRecords?: SortOrder
  }

  export type UploadBatchMaxOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    totalRecords?: SortOrder
    uploadedAt?: SortOrder
    columnMapping?: SortOrder
  }

  export type UploadBatchMinOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    totalRecords?: SortOrder
    uploadedAt?: SortOrder
    columnMapping?: SortOrder
  }

  export type UploadBatchSumOrderByAggregateInput = {
    totalRecords?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type LeadRelationFilter = {
    is?: LeadWhereInput
    isNot?: LeadWhereInput
  }

  export type MeetingCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    agenda?: SortOrder
    scheduledAt?: SortOrder
    emailSent?: SortOrder
    reminderSent?: SortOrder
    recipientEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MeetingMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    agenda?: SortOrder
    scheduledAt?: SortOrder
    emailSent?: SortOrder
    reminderSent?: SortOrder
    recipientEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MeetingMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    agenda?: SortOrder
    scheduledAt?: SortOrder
    emailSent?: SortOrder
    reminderSent?: SortOrder
    recipientEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UploadBatchCreateNestedOneWithoutLeadsInput = {
    create?: XOR<UploadBatchCreateWithoutLeadsInput, UploadBatchUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: UploadBatchCreateOrConnectWithoutLeadsInput
    connect?: UploadBatchWhereUniqueInput
  }

  export type MeetingCreateNestedManyWithoutLeadInput = {
    create?: XOR<MeetingCreateWithoutLeadInput, MeetingUncheckedCreateWithoutLeadInput> | MeetingCreateWithoutLeadInput[] | MeetingUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutLeadInput | MeetingCreateOrConnectWithoutLeadInput[]
    createMany?: MeetingCreateManyLeadInputEnvelope
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
  }

  export type MeetingUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<MeetingCreateWithoutLeadInput, MeetingUncheckedCreateWithoutLeadInput> | MeetingCreateWithoutLeadInput[] | MeetingUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutLeadInput | MeetingCreateOrConnectWithoutLeadInput[]
    createMany?: MeetingCreateManyLeadInputEnvelope
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UploadBatchUpdateOneWithoutLeadsNestedInput = {
    create?: XOR<UploadBatchCreateWithoutLeadsInput, UploadBatchUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: UploadBatchCreateOrConnectWithoutLeadsInput
    upsert?: UploadBatchUpsertWithoutLeadsInput
    disconnect?: boolean
    delete?: UploadBatchWhereInput | boolean
    connect?: UploadBatchWhereUniqueInput
    update?: XOR<XOR<UploadBatchUpdateToOneWithWhereWithoutLeadsInput, UploadBatchUpdateWithoutLeadsInput>, UploadBatchUncheckedUpdateWithoutLeadsInput>
  }

  export type MeetingUpdateManyWithoutLeadNestedInput = {
    create?: XOR<MeetingCreateWithoutLeadInput, MeetingUncheckedCreateWithoutLeadInput> | MeetingCreateWithoutLeadInput[] | MeetingUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutLeadInput | MeetingCreateOrConnectWithoutLeadInput[]
    upsert?: MeetingUpsertWithWhereUniqueWithoutLeadInput | MeetingUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: MeetingCreateManyLeadInputEnvelope
    set?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    disconnect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    delete?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    update?: MeetingUpdateWithWhereUniqueWithoutLeadInput | MeetingUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: MeetingUpdateManyWithWhereWithoutLeadInput | MeetingUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
  }

  export type MeetingUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<MeetingCreateWithoutLeadInput, MeetingUncheckedCreateWithoutLeadInput> | MeetingCreateWithoutLeadInput[] | MeetingUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutLeadInput | MeetingCreateOrConnectWithoutLeadInput[]
    upsert?: MeetingUpsertWithWhereUniqueWithoutLeadInput | MeetingUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: MeetingCreateManyLeadInputEnvelope
    set?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    disconnect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    delete?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    update?: MeetingUpdateWithWhereUniqueWithoutLeadInput | MeetingUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: MeetingUpdateManyWithWhereWithoutLeadInput | MeetingUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
  }

  export type LeadCreateNestedManyWithoutUploadBatchInput = {
    create?: XOR<LeadCreateWithoutUploadBatchInput, LeadUncheckedCreateWithoutUploadBatchInput> | LeadCreateWithoutUploadBatchInput[] | LeadUncheckedCreateWithoutUploadBatchInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutUploadBatchInput | LeadCreateOrConnectWithoutUploadBatchInput[]
    createMany?: LeadCreateManyUploadBatchInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutUploadBatchInput = {
    create?: XOR<LeadCreateWithoutUploadBatchInput, LeadUncheckedCreateWithoutUploadBatchInput> | LeadCreateWithoutUploadBatchInput[] | LeadUncheckedCreateWithoutUploadBatchInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutUploadBatchInput | LeadCreateOrConnectWithoutUploadBatchInput[]
    createMany?: LeadCreateManyUploadBatchInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LeadUpdateManyWithoutUploadBatchNestedInput = {
    create?: XOR<LeadCreateWithoutUploadBatchInput, LeadUncheckedCreateWithoutUploadBatchInput> | LeadCreateWithoutUploadBatchInput[] | LeadUncheckedCreateWithoutUploadBatchInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutUploadBatchInput | LeadCreateOrConnectWithoutUploadBatchInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutUploadBatchInput | LeadUpsertWithWhereUniqueWithoutUploadBatchInput[]
    createMany?: LeadCreateManyUploadBatchInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutUploadBatchInput | LeadUpdateWithWhereUniqueWithoutUploadBatchInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutUploadBatchInput | LeadUpdateManyWithWhereWithoutUploadBatchInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type LeadUncheckedUpdateManyWithoutUploadBatchNestedInput = {
    create?: XOR<LeadCreateWithoutUploadBatchInput, LeadUncheckedCreateWithoutUploadBatchInput> | LeadCreateWithoutUploadBatchInput[] | LeadUncheckedCreateWithoutUploadBatchInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutUploadBatchInput | LeadCreateOrConnectWithoutUploadBatchInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutUploadBatchInput | LeadUpsertWithWhereUniqueWithoutUploadBatchInput[]
    createMany?: LeadCreateManyUploadBatchInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutUploadBatchInput | LeadUpdateWithWhereUniqueWithoutUploadBatchInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutUploadBatchInput | LeadUpdateManyWithWhereWithoutUploadBatchInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type LeadCreateNestedOneWithoutMeetingsInput = {
    create?: XOR<LeadCreateWithoutMeetingsInput, LeadUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutMeetingsInput
    connect?: LeadWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type LeadUpdateOneRequiredWithoutMeetingsNestedInput = {
    create?: XOR<LeadCreateWithoutMeetingsInput, LeadUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutMeetingsInput
    upsert?: LeadUpsertWithoutMeetingsInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutMeetingsInput, LeadUpdateWithoutMeetingsInput>, LeadUncheckedUpdateWithoutMeetingsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UploadBatchCreateWithoutLeadsInput = {
    id?: string
    fileName: string
    totalRecords: number
    uploadedAt?: Date | string
    columnMapping?: string | null
  }

  export type UploadBatchUncheckedCreateWithoutLeadsInput = {
    id?: string
    fileName: string
    totalRecords: number
    uploadedAt?: Date | string
    columnMapping?: string | null
  }

  export type UploadBatchCreateOrConnectWithoutLeadsInput = {
    where: UploadBatchWhereUniqueInput
    create: XOR<UploadBatchCreateWithoutLeadsInput, UploadBatchUncheckedCreateWithoutLeadsInput>
  }

  export type MeetingCreateWithoutLeadInput = {
    id?: string
    title: string
    agenda?: string | null
    scheduledAt: Date | string
    emailSent?: boolean
    reminderSent?: boolean
    recipientEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MeetingUncheckedCreateWithoutLeadInput = {
    id?: string
    title: string
    agenda?: string | null
    scheduledAt: Date | string
    emailSent?: boolean
    reminderSent?: boolean
    recipientEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MeetingCreateOrConnectWithoutLeadInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutLeadInput, MeetingUncheckedCreateWithoutLeadInput>
  }

  export type MeetingCreateManyLeadInputEnvelope = {
    data: MeetingCreateManyLeadInput | MeetingCreateManyLeadInput[]
  }

  export type UploadBatchUpsertWithoutLeadsInput = {
    update: XOR<UploadBatchUpdateWithoutLeadsInput, UploadBatchUncheckedUpdateWithoutLeadsInput>
    create: XOR<UploadBatchCreateWithoutLeadsInput, UploadBatchUncheckedCreateWithoutLeadsInput>
    where?: UploadBatchWhereInput
  }

  export type UploadBatchUpdateToOneWithWhereWithoutLeadsInput = {
    where?: UploadBatchWhereInput
    data: XOR<UploadBatchUpdateWithoutLeadsInput, UploadBatchUncheckedUpdateWithoutLeadsInput>
  }

  export type UploadBatchUpdateWithoutLeadsInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    columnMapping?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UploadBatchUncheckedUpdateWithoutLeadsInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    columnMapping?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MeetingUpsertWithWhereUniqueWithoutLeadInput = {
    where: MeetingWhereUniqueInput
    update: XOR<MeetingUpdateWithoutLeadInput, MeetingUncheckedUpdateWithoutLeadInput>
    create: XOR<MeetingCreateWithoutLeadInput, MeetingUncheckedCreateWithoutLeadInput>
  }

  export type MeetingUpdateWithWhereUniqueWithoutLeadInput = {
    where: MeetingWhereUniqueInput
    data: XOR<MeetingUpdateWithoutLeadInput, MeetingUncheckedUpdateWithoutLeadInput>
  }

  export type MeetingUpdateManyWithWhereWithoutLeadInput = {
    where: MeetingScalarWhereInput
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyWithoutLeadInput>
  }

  export type MeetingScalarWhereInput = {
    AND?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
    OR?: MeetingScalarWhereInput[]
    NOT?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
    id?: StringFilter<"Meeting"> | string
    leadId?: StringFilter<"Meeting"> | string
    title?: StringFilter<"Meeting"> | string
    agenda?: StringNullableFilter<"Meeting"> | string | null
    scheduledAt?: DateTimeFilter<"Meeting"> | Date | string
    emailSent?: BoolFilter<"Meeting"> | boolean
    reminderSent?: BoolFilter<"Meeting"> | boolean
    recipientEmail?: StringNullableFilter<"Meeting"> | string | null
    createdAt?: DateTimeFilter<"Meeting"> | Date | string
    updatedAt?: DateTimeFilter<"Meeting"> | Date | string
  }

  export type LeadCreateWithoutUploadBatchInput = {
    id?: string
    rowNum?: number | null
    prospectFullName: string
    prospectJobTitle?: string | null
    prospectLinkedin?: string | null
    businessName?: string | null
    businessWebsite?: string | null
    businessNumberOfEmployees?: string | null
    businessYearlyRevenue?: string | null
    businessCountry?: string | null
    businessRegion?: string | null
    businessNaicsDescription?: string | null
    contactProfessionalEmail?: string | null
    contactEmails?: string | null
    contactMobilePhone?: string | null
    contactPhoneNumbers?: string | null
    prospectId?: string | null
    businessId?: string | null
    status?: string
    remark?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    originalCreatedAt?: string | null
    rawData?: string | null
    coldCallScript?: string | null
    meetings?: MeetingCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutUploadBatchInput = {
    id?: string
    rowNum?: number | null
    prospectFullName: string
    prospectJobTitle?: string | null
    prospectLinkedin?: string | null
    businessName?: string | null
    businessWebsite?: string | null
    businessNumberOfEmployees?: string | null
    businessYearlyRevenue?: string | null
    businessCountry?: string | null
    businessRegion?: string | null
    businessNaicsDescription?: string | null
    contactProfessionalEmail?: string | null
    contactEmails?: string | null
    contactMobilePhone?: string | null
    contactPhoneNumbers?: string | null
    prospectId?: string | null
    businessId?: string | null
    status?: string
    remark?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    originalCreatedAt?: string | null
    rawData?: string | null
    coldCallScript?: string | null
    meetings?: MeetingUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutUploadBatchInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutUploadBatchInput, LeadUncheckedCreateWithoutUploadBatchInput>
  }

  export type LeadCreateManyUploadBatchInputEnvelope = {
    data: LeadCreateManyUploadBatchInput | LeadCreateManyUploadBatchInput[]
  }

  export type LeadUpsertWithWhereUniqueWithoutUploadBatchInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutUploadBatchInput, LeadUncheckedUpdateWithoutUploadBatchInput>
    create: XOR<LeadCreateWithoutUploadBatchInput, LeadUncheckedCreateWithoutUploadBatchInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutUploadBatchInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutUploadBatchInput, LeadUncheckedUpdateWithoutUploadBatchInput>
  }

  export type LeadUpdateManyWithWhereWithoutUploadBatchInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutUploadBatchInput>
  }

  export type LeadScalarWhereInput = {
    AND?: LeadScalarWhereInput | LeadScalarWhereInput[]
    OR?: LeadScalarWhereInput[]
    NOT?: LeadScalarWhereInput | LeadScalarWhereInput[]
    id?: StringFilter<"Lead"> | string
    rowNum?: IntNullableFilter<"Lead"> | number | null
    prospectFullName?: StringFilter<"Lead"> | string
    prospectJobTitle?: StringNullableFilter<"Lead"> | string | null
    prospectLinkedin?: StringNullableFilter<"Lead"> | string | null
    businessName?: StringNullableFilter<"Lead"> | string | null
    businessWebsite?: StringNullableFilter<"Lead"> | string | null
    businessNumberOfEmployees?: StringNullableFilter<"Lead"> | string | null
    businessYearlyRevenue?: StringNullableFilter<"Lead"> | string | null
    businessCountry?: StringNullableFilter<"Lead"> | string | null
    businessRegion?: StringNullableFilter<"Lead"> | string | null
    businessNaicsDescription?: StringNullableFilter<"Lead"> | string | null
    contactProfessionalEmail?: StringNullableFilter<"Lead"> | string | null
    contactEmails?: StringNullableFilter<"Lead"> | string | null
    contactMobilePhone?: StringNullableFilter<"Lead"> | string | null
    contactPhoneNumbers?: StringNullableFilter<"Lead"> | string | null
    prospectId?: StringNullableFilter<"Lead"> | string | null
    businessId?: StringNullableFilter<"Lead"> | string | null
    status?: StringFilter<"Lead"> | string
    remark?: StringNullableFilter<"Lead"> | string | null
    uploadBatchId?: StringNullableFilter<"Lead"> | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    originalCreatedAt?: StringNullableFilter<"Lead"> | string | null
    rawData?: StringNullableFilter<"Lead"> | string | null
    coldCallScript?: StringNullableFilter<"Lead"> | string | null
  }

  export type LeadCreateWithoutMeetingsInput = {
    id?: string
    rowNum?: number | null
    prospectFullName: string
    prospectJobTitle?: string | null
    prospectLinkedin?: string | null
    businessName?: string | null
    businessWebsite?: string | null
    businessNumberOfEmployees?: string | null
    businessYearlyRevenue?: string | null
    businessCountry?: string | null
    businessRegion?: string | null
    businessNaicsDescription?: string | null
    contactProfessionalEmail?: string | null
    contactEmails?: string | null
    contactMobilePhone?: string | null
    contactPhoneNumbers?: string | null
    prospectId?: string | null
    businessId?: string | null
    status?: string
    remark?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    originalCreatedAt?: string | null
    rawData?: string | null
    coldCallScript?: string | null
    uploadBatch?: UploadBatchCreateNestedOneWithoutLeadsInput
  }

  export type LeadUncheckedCreateWithoutMeetingsInput = {
    id?: string
    rowNum?: number | null
    prospectFullName: string
    prospectJobTitle?: string | null
    prospectLinkedin?: string | null
    businessName?: string | null
    businessWebsite?: string | null
    businessNumberOfEmployees?: string | null
    businessYearlyRevenue?: string | null
    businessCountry?: string | null
    businessRegion?: string | null
    businessNaicsDescription?: string | null
    contactProfessionalEmail?: string | null
    contactEmails?: string | null
    contactMobilePhone?: string | null
    contactPhoneNumbers?: string | null
    prospectId?: string | null
    businessId?: string | null
    status?: string
    remark?: string | null
    uploadBatchId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    originalCreatedAt?: string | null
    rawData?: string | null
    coldCallScript?: string | null
  }

  export type LeadCreateOrConnectWithoutMeetingsInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutMeetingsInput, LeadUncheckedCreateWithoutMeetingsInput>
  }

  export type LeadUpsertWithoutMeetingsInput = {
    update: XOR<LeadUpdateWithoutMeetingsInput, LeadUncheckedUpdateWithoutMeetingsInput>
    create: XOR<LeadCreateWithoutMeetingsInput, LeadUncheckedCreateWithoutMeetingsInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutMeetingsInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutMeetingsInput, LeadUncheckedUpdateWithoutMeetingsInput>
  }

  export type LeadUpdateWithoutMeetingsInput = {
    rowNum?: NullableIntFieldUpdateOperationsInput | number | null
    prospectFullName?: StringFieldUpdateOperationsInput | string
    prospectJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    prospectLinkedin?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    businessWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    businessNumberOfEmployees?: NullableStringFieldUpdateOperationsInput | string | null
    businessYearlyRevenue?: NullableStringFieldUpdateOperationsInput | string | null
    businessCountry?: NullableStringFieldUpdateOperationsInput | string | null
    businessRegion?: NullableStringFieldUpdateOperationsInput | string | null
    businessNaicsDescription?: NullableStringFieldUpdateOperationsInput | string | null
    contactProfessionalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmails?: NullableStringFieldUpdateOperationsInput | string | null
    contactMobilePhone?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhoneNumbers?: NullableStringFieldUpdateOperationsInput | string | null
    prospectId?: NullableStringFieldUpdateOperationsInput | string | null
    businessId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalCreatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    coldCallScript?: NullableStringFieldUpdateOperationsInput | string | null
    uploadBatch?: UploadBatchUpdateOneWithoutLeadsNestedInput
  }

  export type LeadUncheckedUpdateWithoutMeetingsInput = {
    rowNum?: NullableIntFieldUpdateOperationsInput | number | null
    prospectFullName?: StringFieldUpdateOperationsInput | string
    prospectJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    prospectLinkedin?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    businessWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    businessNumberOfEmployees?: NullableStringFieldUpdateOperationsInput | string | null
    businessYearlyRevenue?: NullableStringFieldUpdateOperationsInput | string | null
    businessCountry?: NullableStringFieldUpdateOperationsInput | string | null
    businessRegion?: NullableStringFieldUpdateOperationsInput | string | null
    businessNaicsDescription?: NullableStringFieldUpdateOperationsInput | string | null
    contactProfessionalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmails?: NullableStringFieldUpdateOperationsInput | string | null
    contactMobilePhone?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhoneNumbers?: NullableStringFieldUpdateOperationsInput | string | null
    prospectId?: NullableStringFieldUpdateOperationsInput | string | null
    businessId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    uploadBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalCreatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    coldCallScript?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MeetingCreateManyLeadInput = {
    id?: string
    title: string
    agenda?: string | null
    scheduledAt: Date | string
    emailSent?: boolean
    reminderSent?: boolean
    recipientEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MeetingUpdateWithoutLeadInput = {
    title?: StringFieldUpdateOperationsInput | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    reminderSent?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingUncheckedUpdateWithoutLeadInput = {
    title?: StringFieldUpdateOperationsInput | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    reminderSent?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingUncheckedUpdateManyWithoutLeadInput = {
    title?: StringFieldUpdateOperationsInput | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    reminderSent?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateManyUploadBatchInput = {
    id?: string
    rowNum?: number | null
    prospectFullName: string
    prospectJobTitle?: string | null
    prospectLinkedin?: string | null
    businessName?: string | null
    businessWebsite?: string | null
    businessNumberOfEmployees?: string | null
    businessYearlyRevenue?: string | null
    businessCountry?: string | null
    businessRegion?: string | null
    businessNaicsDescription?: string | null
    contactProfessionalEmail?: string | null
    contactEmails?: string | null
    contactMobilePhone?: string | null
    contactPhoneNumbers?: string | null
    prospectId?: string | null
    businessId?: string | null
    status?: string
    remark?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    originalCreatedAt?: string | null
    rawData?: string | null
    coldCallScript?: string | null
  }

  export type LeadUpdateWithoutUploadBatchInput = {
    rowNum?: NullableIntFieldUpdateOperationsInput | number | null
    prospectFullName?: StringFieldUpdateOperationsInput | string
    prospectJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    prospectLinkedin?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    businessWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    businessNumberOfEmployees?: NullableStringFieldUpdateOperationsInput | string | null
    businessYearlyRevenue?: NullableStringFieldUpdateOperationsInput | string | null
    businessCountry?: NullableStringFieldUpdateOperationsInput | string | null
    businessRegion?: NullableStringFieldUpdateOperationsInput | string | null
    businessNaicsDescription?: NullableStringFieldUpdateOperationsInput | string | null
    contactProfessionalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmails?: NullableStringFieldUpdateOperationsInput | string | null
    contactMobilePhone?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhoneNumbers?: NullableStringFieldUpdateOperationsInput | string | null
    prospectId?: NullableStringFieldUpdateOperationsInput | string | null
    businessId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalCreatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    coldCallScript?: NullableStringFieldUpdateOperationsInput | string | null
    meetings?: MeetingUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutUploadBatchInput = {
    rowNum?: NullableIntFieldUpdateOperationsInput | number | null
    prospectFullName?: StringFieldUpdateOperationsInput | string
    prospectJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    prospectLinkedin?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    businessWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    businessNumberOfEmployees?: NullableStringFieldUpdateOperationsInput | string | null
    businessYearlyRevenue?: NullableStringFieldUpdateOperationsInput | string | null
    businessCountry?: NullableStringFieldUpdateOperationsInput | string | null
    businessRegion?: NullableStringFieldUpdateOperationsInput | string | null
    businessNaicsDescription?: NullableStringFieldUpdateOperationsInput | string | null
    contactProfessionalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmails?: NullableStringFieldUpdateOperationsInput | string | null
    contactMobilePhone?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhoneNumbers?: NullableStringFieldUpdateOperationsInput | string | null
    prospectId?: NullableStringFieldUpdateOperationsInput | string | null
    businessId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalCreatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    coldCallScript?: NullableStringFieldUpdateOperationsInput | string | null
    meetings?: MeetingUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateManyWithoutUploadBatchInput = {
    rowNum?: NullableIntFieldUpdateOperationsInput | number | null
    prospectFullName?: StringFieldUpdateOperationsInput | string
    prospectJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    prospectLinkedin?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    businessWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    businessNumberOfEmployees?: NullableStringFieldUpdateOperationsInput | string | null
    businessYearlyRevenue?: NullableStringFieldUpdateOperationsInput | string | null
    businessCountry?: NullableStringFieldUpdateOperationsInput | string | null
    businessRegion?: NullableStringFieldUpdateOperationsInput | string | null
    businessNaicsDescription?: NullableStringFieldUpdateOperationsInput | string | null
    contactProfessionalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmails?: NullableStringFieldUpdateOperationsInput | string | null
    contactMobilePhone?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhoneNumbers?: NullableStringFieldUpdateOperationsInput | string | null
    prospectId?: NullableStringFieldUpdateOperationsInput | string | null
    businessId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalCreatedAt?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    coldCallScript?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use LeadCountOutputTypeDefaultArgs instead
     */
    export type LeadCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeadCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UploadBatchCountOutputTypeDefaultArgs instead
     */
    export type UploadBatchCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UploadBatchCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LeadDefaultArgs instead
     */
    export type LeadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeadDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UploadBatchDefaultArgs instead
     */
    export type UploadBatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UploadBatchDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MeetingDefaultArgs instead
     */
    export type MeetingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MeetingDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}