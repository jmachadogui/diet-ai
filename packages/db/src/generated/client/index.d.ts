
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserIdentity
 * 
 */
export type UserIdentity = $Result.DefaultSelection<Prisma.$UserIdentityPayload>
/**
 * Model MagicLinkToken
 * 
 */
export type MagicLinkToken = $Result.DefaultSelection<Prisma.$MagicLinkTokenPayload>
/**
 * Model Log
 * 
 */
export type Log = $Result.DefaultSelection<Prisma.$LogPayload>
/**
 * Model Meal
 * 
 */
export type Meal = $Result.DefaultSelection<Prisma.$MealPayload>
/**
 * Model MealItem
 * 
 */
export type MealItem = $Result.DefaultSelection<Prisma.$MealItemPayload>
/**
 * Model ApiCache
 * 
 */
export type ApiCache = $Result.DefaultSelection<Prisma.$ApiCachePayload>
/**
 * Model UserWeightHistory
 * 
 */
export type UserWeightHistory = $Result.DefaultSelection<Prisma.$UserWeightHistoryPayload>
/**
 * Model EditHistory
 * 
 */
export type EditHistory = $Result.DefaultSelection<Prisma.$EditHistoryPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

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
   * `prisma.userIdentity`: Exposes CRUD operations for the **UserIdentity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserIdentities
    * const userIdentities = await prisma.userIdentity.findMany()
    * ```
    */
  get userIdentity(): Prisma.UserIdentityDelegate<ExtArgs>;

  /**
   * `prisma.magicLinkToken`: Exposes CRUD operations for the **MagicLinkToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MagicLinkTokens
    * const magicLinkTokens = await prisma.magicLinkToken.findMany()
    * ```
    */
  get magicLinkToken(): Prisma.MagicLinkTokenDelegate<ExtArgs>;

  /**
   * `prisma.log`: Exposes CRUD operations for the **Log** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Logs
    * const logs = await prisma.log.findMany()
    * ```
    */
  get log(): Prisma.LogDelegate<ExtArgs>;

  /**
   * `prisma.meal`: Exposes CRUD operations for the **Meal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Meals
    * const meals = await prisma.meal.findMany()
    * ```
    */
  get meal(): Prisma.MealDelegate<ExtArgs>;

  /**
   * `prisma.mealItem`: Exposes CRUD operations for the **MealItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MealItems
    * const mealItems = await prisma.mealItem.findMany()
    * ```
    */
  get mealItem(): Prisma.MealItemDelegate<ExtArgs>;

  /**
   * `prisma.apiCache`: Exposes CRUD operations for the **ApiCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiCaches
    * const apiCaches = await prisma.apiCache.findMany()
    * ```
    */
  get apiCache(): Prisma.ApiCacheDelegate<ExtArgs>;

  /**
   * `prisma.userWeightHistory`: Exposes CRUD operations for the **UserWeightHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserWeightHistories
    * const userWeightHistories = await prisma.userWeightHistory.findMany()
    * ```
    */
  get userWeightHistory(): Prisma.UserWeightHistoryDelegate<ExtArgs>;

  /**
   * `prisma.editHistory`: Exposes CRUD operations for the **EditHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EditHistories
    * const editHistories = await prisma.editHistory.findMany()
    * ```
    */
  get editHistory(): Prisma.EditHistoryDelegate<ExtArgs>;
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
    User: 'User',
    UserIdentity: 'UserIdentity',
    MagicLinkToken: 'MagicLinkToken',
    Log: 'Log',
    Meal: 'Meal',
    MealItem: 'MealItem',
    ApiCache: 'ApiCache',
    UserWeightHistory: 'UserWeightHistory',
    EditHistory: 'EditHistory'
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
      modelProps: "user" | "userIdentity" | "magicLinkToken" | "log" | "meal" | "mealItem" | "apiCache" | "userWeightHistory" | "editHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
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
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserIdentity: {
        payload: Prisma.$UserIdentityPayload<ExtArgs>
        fields: Prisma.UserIdentityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserIdentityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserIdentityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          findFirst: {
            args: Prisma.UserIdentityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserIdentityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          findMany: {
            args: Prisma.UserIdentityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>[]
          }
          create: {
            args: Prisma.UserIdentityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          createMany: {
            args: Prisma.UserIdentityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserIdentityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>[]
          }
          delete: {
            args: Prisma.UserIdentityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          update: {
            args: Prisma.UserIdentityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          deleteMany: {
            args: Prisma.UserIdentityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserIdentityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserIdentityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserIdentityPayload>
          }
          aggregate: {
            args: Prisma.UserIdentityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserIdentity>
          }
          groupBy: {
            args: Prisma.UserIdentityGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserIdentityGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserIdentityCountArgs<ExtArgs>
            result: $Utils.Optional<UserIdentityCountAggregateOutputType> | number
          }
        }
      }
      MagicLinkToken: {
        payload: Prisma.$MagicLinkTokenPayload<ExtArgs>
        fields: Prisma.MagicLinkTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MagicLinkTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicLinkTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MagicLinkTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicLinkTokenPayload>
          }
          findFirst: {
            args: Prisma.MagicLinkTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicLinkTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MagicLinkTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicLinkTokenPayload>
          }
          findMany: {
            args: Prisma.MagicLinkTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicLinkTokenPayload>[]
          }
          create: {
            args: Prisma.MagicLinkTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicLinkTokenPayload>
          }
          createMany: {
            args: Prisma.MagicLinkTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MagicLinkTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicLinkTokenPayload>[]
          }
          delete: {
            args: Prisma.MagicLinkTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicLinkTokenPayload>
          }
          update: {
            args: Prisma.MagicLinkTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicLinkTokenPayload>
          }
          deleteMany: {
            args: Prisma.MagicLinkTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MagicLinkTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MagicLinkTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicLinkTokenPayload>
          }
          aggregate: {
            args: Prisma.MagicLinkTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMagicLinkToken>
          }
          groupBy: {
            args: Prisma.MagicLinkTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<MagicLinkTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.MagicLinkTokenCountArgs<ExtArgs>
            result: $Utils.Optional<MagicLinkTokenCountAggregateOutputType> | number
          }
        }
      }
      Log: {
        payload: Prisma.$LogPayload<ExtArgs>
        fields: Prisma.LogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>
          }
          findFirst: {
            args: Prisma.LogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>
          }
          findMany: {
            args: Prisma.LogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>[]
          }
          create: {
            args: Prisma.LogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>
          }
          createMany: {
            args: Prisma.LogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>[]
          }
          delete: {
            args: Prisma.LogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>
          }
          update: {
            args: Prisma.LogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>
          }
          deleteMany: {
            args: Prisma.LogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>
          }
          aggregate: {
            args: Prisma.LogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLog>
          }
          groupBy: {
            args: Prisma.LogGroupByArgs<ExtArgs>
            result: $Utils.Optional<LogGroupByOutputType>[]
          }
          count: {
            args: Prisma.LogCountArgs<ExtArgs>
            result: $Utils.Optional<LogCountAggregateOutputType> | number
          }
        }
      }
      Meal: {
        payload: Prisma.$MealPayload<ExtArgs>
        fields: Prisma.MealFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MealFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MealFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>
          }
          findFirst: {
            args: Prisma.MealFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MealFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>
          }
          findMany: {
            args: Prisma.MealFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>[]
          }
          create: {
            args: Prisma.MealCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>
          }
          createMany: {
            args: Prisma.MealCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MealCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>[]
          }
          delete: {
            args: Prisma.MealDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>
          }
          update: {
            args: Prisma.MealUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>
          }
          deleteMany: {
            args: Prisma.MealDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MealUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MealUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPayload>
          }
          aggregate: {
            args: Prisma.MealAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeal>
          }
          groupBy: {
            args: Prisma.MealGroupByArgs<ExtArgs>
            result: $Utils.Optional<MealGroupByOutputType>[]
          }
          count: {
            args: Prisma.MealCountArgs<ExtArgs>
            result: $Utils.Optional<MealCountAggregateOutputType> | number
          }
        }
      }
      MealItem: {
        payload: Prisma.$MealItemPayload<ExtArgs>
        fields: Prisma.MealItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MealItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MealItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>
          }
          findFirst: {
            args: Prisma.MealItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MealItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>
          }
          findMany: {
            args: Prisma.MealItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>[]
          }
          create: {
            args: Prisma.MealItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>
          }
          createMany: {
            args: Prisma.MealItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MealItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>[]
          }
          delete: {
            args: Prisma.MealItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>
          }
          update: {
            args: Prisma.MealItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>
          }
          deleteMany: {
            args: Prisma.MealItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MealItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MealItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealItemPayload>
          }
          aggregate: {
            args: Prisma.MealItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMealItem>
          }
          groupBy: {
            args: Prisma.MealItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<MealItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.MealItemCountArgs<ExtArgs>
            result: $Utils.Optional<MealItemCountAggregateOutputType> | number
          }
        }
      }
      ApiCache: {
        payload: Prisma.$ApiCachePayload<ExtArgs>
        fields: Prisma.ApiCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiCachePayload>
          }
          findFirst: {
            args: Prisma.ApiCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiCachePayload>
          }
          findMany: {
            args: Prisma.ApiCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiCachePayload>[]
          }
          create: {
            args: Prisma.ApiCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiCachePayload>
          }
          createMany: {
            args: Prisma.ApiCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiCachePayload>[]
          }
          delete: {
            args: Prisma.ApiCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiCachePayload>
          }
          update: {
            args: Prisma.ApiCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiCachePayload>
          }
          deleteMany: {
            args: Prisma.ApiCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApiCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiCachePayload>
          }
          aggregate: {
            args: Prisma.ApiCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiCache>
          }
          groupBy: {
            args: Prisma.ApiCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiCacheCountArgs<ExtArgs>
            result: $Utils.Optional<ApiCacheCountAggregateOutputType> | number
          }
        }
      }
      UserWeightHistory: {
        payload: Prisma.$UserWeightHistoryPayload<ExtArgs>
        fields: Prisma.UserWeightHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserWeightHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWeightHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserWeightHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWeightHistoryPayload>
          }
          findFirst: {
            args: Prisma.UserWeightHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWeightHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserWeightHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWeightHistoryPayload>
          }
          findMany: {
            args: Prisma.UserWeightHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWeightHistoryPayload>[]
          }
          create: {
            args: Prisma.UserWeightHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWeightHistoryPayload>
          }
          createMany: {
            args: Prisma.UserWeightHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserWeightHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWeightHistoryPayload>[]
          }
          delete: {
            args: Prisma.UserWeightHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWeightHistoryPayload>
          }
          update: {
            args: Prisma.UserWeightHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWeightHistoryPayload>
          }
          deleteMany: {
            args: Prisma.UserWeightHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserWeightHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserWeightHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWeightHistoryPayload>
          }
          aggregate: {
            args: Prisma.UserWeightHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserWeightHistory>
          }
          groupBy: {
            args: Prisma.UserWeightHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserWeightHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserWeightHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<UserWeightHistoryCountAggregateOutputType> | number
          }
        }
      }
      EditHistory: {
        payload: Prisma.$EditHistoryPayload<ExtArgs>
        fields: Prisma.EditHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EditHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EditHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EditHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EditHistoryPayload>
          }
          findFirst: {
            args: Prisma.EditHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EditHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EditHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EditHistoryPayload>
          }
          findMany: {
            args: Prisma.EditHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EditHistoryPayload>[]
          }
          create: {
            args: Prisma.EditHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EditHistoryPayload>
          }
          createMany: {
            args: Prisma.EditHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EditHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EditHistoryPayload>[]
          }
          delete: {
            args: Prisma.EditHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EditHistoryPayload>
          }
          update: {
            args: Prisma.EditHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EditHistoryPayload>
          }
          deleteMany: {
            args: Prisma.EditHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EditHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EditHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EditHistoryPayload>
          }
          aggregate: {
            args: Prisma.EditHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEditHistory>
          }
          groupBy: {
            args: Prisma.EditHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<EditHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.EditHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<EditHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
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
      isolationLevel?: Prisma.TransactionIsolationLevel
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    identities: number
    magicLinkTokens: number
    logs: number
    meals: number
    weightHistory: number
    editHistory: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    identities?: boolean | UserCountOutputTypeCountIdentitiesArgs
    magicLinkTokens?: boolean | UserCountOutputTypeCountMagicLinkTokensArgs
    logs?: boolean | UserCountOutputTypeCountLogsArgs
    meals?: boolean | UserCountOutputTypeCountMealsArgs
    weightHistory?: boolean | UserCountOutputTypeCountWeightHistoryArgs
    editHistory?: boolean | UserCountOutputTypeCountEditHistoryArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountIdentitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserIdentityWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMagicLinkTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MagicLinkTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWeightHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWeightHistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEditHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EditHistoryWhereInput
  }


  /**
   * Count Type LogCountOutputType
   */

  export type LogCountOutputType = {
    meals: number
    editHistory: number
  }

  export type LogCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meals?: boolean | LogCountOutputTypeCountMealsArgs
    editHistory?: boolean | LogCountOutputTypeCountEditHistoryArgs
  }

  // Custom InputTypes
  /**
   * LogCountOutputType without action
   */
  export type LogCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogCountOutputType
     */
    select?: LogCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LogCountOutputType without action
   */
  export type LogCountOutputTypeCountMealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealWhereInput
  }

  /**
   * LogCountOutputType without action
   */
  export type LogCountOutputTypeCountEditHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EditHistoryWhereInput
  }


  /**
   * Count Type MealCountOutputType
   */

  export type MealCountOutputType = {
    items: number
    editHistory: number
  }

  export type MealCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | MealCountOutputTypeCountItemsArgs
    editHistory?: boolean | MealCountOutputTypeCountEditHistoryArgs
  }

  // Custom InputTypes
  /**
   * MealCountOutputType without action
   */
  export type MealCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCountOutputType
     */
    select?: MealCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MealCountOutputType without action
   */
  export type MealCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealItemWhereInput
  }

  /**
   * MealCountOutputType without action
   */
  export type MealCountOutputTypeCountEditHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EditHistoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    dailyCalorieGoal: number | null
    weightKg: number | null
    heightCm: number | null
    age: number | null
  }

  export type UserSumAggregateOutputType = {
    dailyCalorieGoal: number | null
    weightKg: number | null
    heightCm: number | null
    age: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    dailyCalorieGoal: number | null
    weightKg: number | null
    heightCm: number | null
    age: number | null
    sex: string | null
    activityLevel: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    dailyCalorieGoal: number | null
    weightKg: number | null
    heightCm: number | null
    age: number | null
    sex: string | null
    activityLevel: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    dailyCalorieGoal: number
    weightKg: number
    heightCm: number
    age: number
    sex: number
    activityLevel: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    dailyCalorieGoal?: true
    weightKg?: true
    heightCm?: true
    age?: true
  }

  export type UserSumAggregateInputType = {
    dailyCalorieGoal?: true
    weightKg?: true
    heightCm?: true
    age?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    dailyCalorieGoal?: true
    weightKg?: true
    heightCm?: true
    age?: true
    sex?: true
    activityLevel?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    dailyCalorieGoal?: true
    weightKg?: true
    heightCm?: true
    age?: true
    sex?: true
    activityLevel?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    dailyCalorieGoal?: true
    weightKg?: true
    heightCm?: true
    age?: true
    sex?: true
    activityLevel?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    dailyCalorieGoal: number | null
    weightKg: number | null
    heightCm: number | null
    age: number | null
    sex: string | null
    activityLevel: string | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    passwordHash?: boolean
    dailyCalorieGoal?: boolean
    weightKg?: boolean
    heightCm?: boolean
    age?: boolean
    sex?: boolean
    activityLevel?: boolean
    createdAt?: boolean
    identities?: boolean | User$identitiesArgs<ExtArgs>
    magicLinkTokens?: boolean | User$magicLinkTokensArgs<ExtArgs>
    logs?: boolean | User$logsArgs<ExtArgs>
    meals?: boolean | User$mealsArgs<ExtArgs>
    weightHistory?: boolean | User$weightHistoryArgs<ExtArgs>
    editHistory?: boolean | User$editHistoryArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    dailyCalorieGoal?: boolean
    weightKg?: boolean
    heightCm?: boolean
    age?: boolean
    sex?: boolean
    activityLevel?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    dailyCalorieGoal?: boolean
    weightKg?: boolean
    heightCm?: boolean
    age?: boolean
    sex?: boolean
    activityLevel?: boolean
    createdAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    identities?: boolean | User$identitiesArgs<ExtArgs>
    magicLinkTokens?: boolean | User$magicLinkTokensArgs<ExtArgs>
    logs?: boolean | User$logsArgs<ExtArgs>
    meals?: boolean | User$mealsArgs<ExtArgs>
    weightHistory?: boolean | User$weightHistoryArgs<ExtArgs>
    editHistory?: boolean | User$editHistoryArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      identities: Prisma.$UserIdentityPayload<ExtArgs>[]
      magicLinkTokens: Prisma.$MagicLinkTokenPayload<ExtArgs>[]
      logs: Prisma.$LogPayload<ExtArgs>[]
      meals: Prisma.$MealPayload<ExtArgs>[]
      weightHistory: Prisma.$UserWeightHistoryPayload<ExtArgs>[]
      editHistory: Prisma.$EditHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      dailyCalorieGoal: number | null
      weightKg: number | null
      heightCm: number | null
      age: number | null
      sex: string | null
      activityLevel: string | null
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
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

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
    identities<T extends User$identitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$identitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findMany"> | Null>
    magicLinkTokens<T extends User$magicLinkTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$magicLinkTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MagicLinkTokenPayload<ExtArgs>, T, "findMany"> | Null>
    logs<T extends User$logsArgs<ExtArgs> = {}>(args?: Subset<T, User$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "findMany"> | Null>
    meals<T extends User$mealsArgs<ExtArgs> = {}>(args?: Subset<T, User$mealsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findMany"> | Null>
    weightHistory<T extends User$weightHistoryArgs<ExtArgs> = {}>(args?: Subset<T, User$weightHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWeightHistoryPayload<ExtArgs>, T, "findMany"> | Null>
    editHistory<T extends User$editHistoryArgs<ExtArgs> = {}>(args?: Subset<T, User$editHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EditHistoryPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly dailyCalorieGoal: FieldRef<"User", 'Int'>
    readonly weightKg: FieldRef<"User", 'Float'>
    readonly heightCm: FieldRef<"User", 'Float'>
    readonly age: FieldRef<"User", 'Int'>
    readonly sex: FieldRef<"User", 'String'>
    readonly activityLevel: FieldRef<"User", 'String'>
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
   * User.identities
   */
  export type User$identitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    where?: UserIdentityWhereInput
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    cursor?: UserIdentityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserIdentityScalarFieldEnum | UserIdentityScalarFieldEnum[]
  }

  /**
   * User.magicLinkTokens
   */
  export type User$magicLinkTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicLinkToken
     */
    select?: MagicLinkTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MagicLinkTokenInclude<ExtArgs> | null
    where?: MagicLinkTokenWhereInput
    orderBy?: MagicLinkTokenOrderByWithRelationInput | MagicLinkTokenOrderByWithRelationInput[]
    cursor?: MagicLinkTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MagicLinkTokenScalarFieldEnum | MagicLinkTokenScalarFieldEnum[]
  }

  /**
   * User.logs
   */
  export type User$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogInclude<ExtArgs> | null
    where?: LogWhereInput
    orderBy?: LogOrderByWithRelationInput | LogOrderByWithRelationInput[]
    cursor?: LogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LogScalarFieldEnum | LogScalarFieldEnum[]
  }

  /**
   * User.meals
   */
  export type User$mealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    where?: MealWhereInput
    orderBy?: MealOrderByWithRelationInput | MealOrderByWithRelationInput[]
    cursor?: MealWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MealScalarFieldEnum | MealScalarFieldEnum[]
  }

  /**
   * User.weightHistory
   */
  export type User$weightHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWeightHistory
     */
    select?: UserWeightHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWeightHistoryInclude<ExtArgs> | null
    where?: UserWeightHistoryWhereInput
    orderBy?: UserWeightHistoryOrderByWithRelationInput | UserWeightHistoryOrderByWithRelationInput[]
    cursor?: UserWeightHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserWeightHistoryScalarFieldEnum | UserWeightHistoryScalarFieldEnum[]
  }

  /**
   * User.editHistory
   */
  export type User$editHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryInclude<ExtArgs> | null
    where?: EditHistoryWhereInput
    orderBy?: EditHistoryOrderByWithRelationInput | EditHistoryOrderByWithRelationInput[]
    cursor?: EditHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EditHistoryScalarFieldEnum | EditHistoryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserIdentity
   */

  export type AggregateUserIdentity = {
    _count: UserIdentityCountAggregateOutputType | null
    _min: UserIdentityMinAggregateOutputType | null
    _max: UserIdentityMaxAggregateOutputType | null
  }

  export type UserIdentityMinAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    platformUserId: string | null
    linkedAt: Date | null
    lastSeenAt: Date | null
    isPrimary: boolean | null
  }

  export type UserIdentityMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    platformUserId: string | null
    linkedAt: Date | null
    lastSeenAt: Date | null
    isPrimary: boolean | null
  }

  export type UserIdentityCountAggregateOutputType = {
    id: number
    userId: number
    platform: number
    platformUserId: number
    linkedAt: number
    lastSeenAt: number
    isPrimary: number
    _all: number
  }


  export type UserIdentityMinAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    platformUserId?: true
    linkedAt?: true
    lastSeenAt?: true
    isPrimary?: true
  }

  export type UserIdentityMaxAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    platformUserId?: true
    linkedAt?: true
    lastSeenAt?: true
    isPrimary?: true
  }

  export type UserIdentityCountAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    platformUserId?: true
    linkedAt?: true
    lastSeenAt?: true
    isPrimary?: true
    _all?: true
  }

  export type UserIdentityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserIdentity to aggregate.
     */
    where?: UserIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserIdentities to fetch.
     */
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserIdentities
    **/
    _count?: true | UserIdentityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserIdentityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserIdentityMaxAggregateInputType
  }

  export type GetUserIdentityAggregateType<T extends UserIdentityAggregateArgs> = {
        [P in keyof T & keyof AggregateUserIdentity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserIdentity[P]>
      : GetScalarType<T[P], AggregateUserIdentity[P]>
  }




  export type UserIdentityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserIdentityWhereInput
    orderBy?: UserIdentityOrderByWithAggregationInput | UserIdentityOrderByWithAggregationInput[]
    by: UserIdentityScalarFieldEnum[] | UserIdentityScalarFieldEnum
    having?: UserIdentityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserIdentityCountAggregateInputType | true
    _min?: UserIdentityMinAggregateInputType
    _max?: UserIdentityMaxAggregateInputType
  }

  export type UserIdentityGroupByOutputType = {
    id: string
    userId: string
    platform: string
    platformUserId: string
    linkedAt: Date
    lastSeenAt: Date | null
    isPrimary: boolean
    _count: UserIdentityCountAggregateOutputType | null
    _min: UserIdentityMinAggregateOutputType | null
    _max: UserIdentityMaxAggregateOutputType | null
  }

  type GetUserIdentityGroupByPayload<T extends UserIdentityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserIdentityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserIdentityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserIdentityGroupByOutputType[P]>
            : GetScalarType<T[P], UserIdentityGroupByOutputType[P]>
        }
      >
    >


  export type UserIdentitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    platformUserId?: boolean
    linkedAt?: boolean
    lastSeenAt?: boolean
    isPrimary?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userIdentity"]>

  export type UserIdentitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    platformUserId?: boolean
    linkedAt?: boolean
    lastSeenAt?: boolean
    isPrimary?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userIdentity"]>

  export type UserIdentitySelectScalar = {
    id?: boolean
    userId?: boolean
    platform?: boolean
    platformUserId?: boolean
    linkedAt?: boolean
    lastSeenAt?: boolean
    isPrimary?: boolean
  }

  export type UserIdentityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserIdentityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserIdentityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserIdentity"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      platform: string
      platformUserId: string
      linkedAt: Date
      lastSeenAt: Date | null
      isPrimary: boolean
    }, ExtArgs["result"]["userIdentity"]>
    composites: {}
  }

  type UserIdentityGetPayload<S extends boolean | null | undefined | UserIdentityDefaultArgs> = $Result.GetResult<Prisma.$UserIdentityPayload, S>

  type UserIdentityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserIdentityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserIdentityCountAggregateInputType | true
    }

  export interface UserIdentityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserIdentity'], meta: { name: 'UserIdentity' } }
    /**
     * Find zero or one UserIdentity that matches the filter.
     * @param {UserIdentityFindUniqueArgs} args - Arguments to find a UserIdentity
     * @example
     * // Get one UserIdentity
     * const userIdentity = await prisma.userIdentity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserIdentityFindUniqueArgs>(args: SelectSubset<T, UserIdentityFindUniqueArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserIdentity that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserIdentityFindUniqueOrThrowArgs} args - Arguments to find a UserIdentity
     * @example
     * // Get one UserIdentity
     * const userIdentity = await prisma.userIdentity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserIdentityFindUniqueOrThrowArgs>(args: SelectSubset<T, UserIdentityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserIdentity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityFindFirstArgs} args - Arguments to find a UserIdentity
     * @example
     * // Get one UserIdentity
     * const userIdentity = await prisma.userIdentity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserIdentityFindFirstArgs>(args?: SelectSubset<T, UserIdentityFindFirstArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserIdentity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityFindFirstOrThrowArgs} args - Arguments to find a UserIdentity
     * @example
     * // Get one UserIdentity
     * const userIdentity = await prisma.userIdentity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserIdentityFindFirstOrThrowArgs>(args?: SelectSubset<T, UserIdentityFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserIdentities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserIdentities
     * const userIdentities = await prisma.userIdentity.findMany()
     * 
     * // Get first 10 UserIdentities
     * const userIdentities = await prisma.userIdentity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userIdentityWithIdOnly = await prisma.userIdentity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserIdentityFindManyArgs>(args?: SelectSubset<T, UserIdentityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserIdentity.
     * @param {UserIdentityCreateArgs} args - Arguments to create a UserIdentity.
     * @example
     * // Create one UserIdentity
     * const UserIdentity = await prisma.userIdentity.create({
     *   data: {
     *     // ... data to create a UserIdentity
     *   }
     * })
     * 
     */
    create<T extends UserIdentityCreateArgs>(args: SelectSubset<T, UserIdentityCreateArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserIdentities.
     * @param {UserIdentityCreateManyArgs} args - Arguments to create many UserIdentities.
     * @example
     * // Create many UserIdentities
     * const userIdentity = await prisma.userIdentity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserIdentityCreateManyArgs>(args?: SelectSubset<T, UserIdentityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserIdentities and returns the data saved in the database.
     * @param {UserIdentityCreateManyAndReturnArgs} args - Arguments to create many UserIdentities.
     * @example
     * // Create many UserIdentities
     * const userIdentity = await prisma.userIdentity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserIdentities and only return the `id`
     * const userIdentityWithIdOnly = await prisma.userIdentity.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserIdentityCreateManyAndReturnArgs>(args?: SelectSubset<T, UserIdentityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserIdentity.
     * @param {UserIdentityDeleteArgs} args - Arguments to delete one UserIdentity.
     * @example
     * // Delete one UserIdentity
     * const UserIdentity = await prisma.userIdentity.delete({
     *   where: {
     *     // ... filter to delete one UserIdentity
     *   }
     * })
     * 
     */
    delete<T extends UserIdentityDeleteArgs>(args: SelectSubset<T, UserIdentityDeleteArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserIdentity.
     * @param {UserIdentityUpdateArgs} args - Arguments to update one UserIdentity.
     * @example
     * // Update one UserIdentity
     * const userIdentity = await prisma.userIdentity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserIdentityUpdateArgs>(args: SelectSubset<T, UserIdentityUpdateArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserIdentities.
     * @param {UserIdentityDeleteManyArgs} args - Arguments to filter UserIdentities to delete.
     * @example
     * // Delete a few UserIdentities
     * const { count } = await prisma.userIdentity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserIdentityDeleteManyArgs>(args?: SelectSubset<T, UserIdentityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserIdentities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserIdentities
     * const userIdentity = await prisma.userIdentity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserIdentityUpdateManyArgs>(args: SelectSubset<T, UserIdentityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserIdentity.
     * @param {UserIdentityUpsertArgs} args - Arguments to update or create a UserIdentity.
     * @example
     * // Update or create a UserIdentity
     * const userIdentity = await prisma.userIdentity.upsert({
     *   create: {
     *     // ... data to create a UserIdentity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserIdentity we want to update
     *   }
     * })
     */
    upsert<T extends UserIdentityUpsertArgs>(args: SelectSubset<T, UserIdentityUpsertArgs<ExtArgs>>): Prisma__UserIdentityClient<$Result.GetResult<Prisma.$UserIdentityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserIdentities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityCountArgs} args - Arguments to filter UserIdentities to count.
     * @example
     * // Count the number of UserIdentities
     * const count = await prisma.userIdentity.count({
     *   where: {
     *     // ... the filter for the UserIdentities we want to count
     *   }
     * })
    **/
    count<T extends UserIdentityCountArgs>(
      args?: Subset<T, UserIdentityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserIdentityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserIdentity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserIdentityAggregateArgs>(args: Subset<T, UserIdentityAggregateArgs>): Prisma.PrismaPromise<GetUserIdentityAggregateType<T>>

    /**
     * Group by UserIdentity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserIdentityGroupByArgs} args - Group by arguments.
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
      T extends UserIdentityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserIdentityGroupByArgs['orderBy'] }
        : { orderBy?: UserIdentityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserIdentityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserIdentityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserIdentity model
   */
  readonly fields: UserIdentityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserIdentity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserIdentityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the UserIdentity model
   */ 
  interface UserIdentityFieldRefs {
    readonly id: FieldRef<"UserIdentity", 'String'>
    readonly userId: FieldRef<"UserIdentity", 'String'>
    readonly platform: FieldRef<"UserIdentity", 'String'>
    readonly platformUserId: FieldRef<"UserIdentity", 'String'>
    readonly linkedAt: FieldRef<"UserIdentity", 'DateTime'>
    readonly lastSeenAt: FieldRef<"UserIdentity", 'DateTime'>
    readonly isPrimary: FieldRef<"UserIdentity", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * UserIdentity findUnique
   */
  export type UserIdentityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentity to fetch.
     */
    where: UserIdentityWhereUniqueInput
  }

  /**
   * UserIdentity findUniqueOrThrow
   */
  export type UserIdentityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentity to fetch.
     */
    where: UserIdentityWhereUniqueInput
  }

  /**
   * UserIdentity findFirst
   */
  export type UserIdentityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentity to fetch.
     */
    where?: UserIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserIdentities to fetch.
     */
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserIdentities.
     */
    cursor?: UserIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserIdentities.
     */
    distinct?: UserIdentityScalarFieldEnum | UserIdentityScalarFieldEnum[]
  }

  /**
   * UserIdentity findFirstOrThrow
   */
  export type UserIdentityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentity to fetch.
     */
    where?: UserIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserIdentities to fetch.
     */
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserIdentities.
     */
    cursor?: UserIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserIdentities.
     */
    distinct?: UserIdentityScalarFieldEnum | UserIdentityScalarFieldEnum[]
  }

  /**
   * UserIdentity findMany
   */
  export type UserIdentityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter, which UserIdentities to fetch.
     */
    where?: UserIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserIdentities to fetch.
     */
    orderBy?: UserIdentityOrderByWithRelationInput | UserIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserIdentities.
     */
    cursor?: UserIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserIdentities.
     */
    skip?: number
    distinct?: UserIdentityScalarFieldEnum | UserIdentityScalarFieldEnum[]
  }

  /**
   * UserIdentity create
   */
  export type UserIdentityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * The data needed to create a UserIdentity.
     */
    data: XOR<UserIdentityCreateInput, UserIdentityUncheckedCreateInput>
  }

  /**
   * UserIdentity createMany
   */
  export type UserIdentityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserIdentities.
     */
    data: UserIdentityCreateManyInput | UserIdentityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserIdentity createManyAndReturn
   */
  export type UserIdentityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserIdentities.
     */
    data: UserIdentityCreateManyInput | UserIdentityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserIdentity update
   */
  export type UserIdentityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * The data needed to update a UserIdentity.
     */
    data: XOR<UserIdentityUpdateInput, UserIdentityUncheckedUpdateInput>
    /**
     * Choose, which UserIdentity to update.
     */
    where: UserIdentityWhereUniqueInput
  }

  /**
   * UserIdentity updateMany
   */
  export type UserIdentityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserIdentities.
     */
    data: XOR<UserIdentityUpdateManyMutationInput, UserIdentityUncheckedUpdateManyInput>
    /**
     * Filter which UserIdentities to update
     */
    where?: UserIdentityWhereInput
  }

  /**
   * UserIdentity upsert
   */
  export type UserIdentityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * The filter to search for the UserIdentity to update in case it exists.
     */
    where: UserIdentityWhereUniqueInput
    /**
     * In case the UserIdentity found by the `where` argument doesn't exist, create a new UserIdentity with this data.
     */
    create: XOR<UserIdentityCreateInput, UserIdentityUncheckedCreateInput>
    /**
     * In case the UserIdentity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserIdentityUpdateInput, UserIdentityUncheckedUpdateInput>
  }

  /**
   * UserIdentity delete
   */
  export type UserIdentityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
    /**
     * Filter which UserIdentity to delete.
     */
    where: UserIdentityWhereUniqueInput
  }

  /**
   * UserIdentity deleteMany
   */
  export type UserIdentityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserIdentities to delete
     */
    where?: UserIdentityWhereInput
  }

  /**
   * UserIdentity without action
   */
  export type UserIdentityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserIdentity
     */
    select?: UserIdentitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIdentityInclude<ExtArgs> | null
  }


  /**
   * Model MagicLinkToken
   */

  export type AggregateMagicLinkToken = {
    _count: MagicLinkTokenCountAggregateOutputType | null
    _min: MagicLinkTokenMinAggregateOutputType | null
    _max: MagicLinkTokenMaxAggregateOutputType | null
  }

  export type MagicLinkTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    token: string | null
    expiresAt: Date | null
    usedAt: Date | null
    redirectUrl: string | null
  }

  export type MagicLinkTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    token: string | null
    expiresAt: Date | null
    usedAt: Date | null
    redirectUrl: string | null
  }

  export type MagicLinkTokenCountAggregateOutputType = {
    id: number
    userId: number
    platform: number
    token: number
    expiresAt: number
    usedAt: number
    redirectUrl: number
    _all: number
  }


  export type MagicLinkTokenMinAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    token?: true
    expiresAt?: true
    usedAt?: true
    redirectUrl?: true
  }

  export type MagicLinkTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    token?: true
    expiresAt?: true
    usedAt?: true
    redirectUrl?: true
  }

  export type MagicLinkTokenCountAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    token?: true
    expiresAt?: true
    usedAt?: true
    redirectUrl?: true
    _all?: true
  }

  export type MagicLinkTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MagicLinkToken to aggregate.
     */
    where?: MagicLinkTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MagicLinkTokens to fetch.
     */
    orderBy?: MagicLinkTokenOrderByWithRelationInput | MagicLinkTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MagicLinkTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MagicLinkTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MagicLinkTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MagicLinkTokens
    **/
    _count?: true | MagicLinkTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MagicLinkTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MagicLinkTokenMaxAggregateInputType
  }

  export type GetMagicLinkTokenAggregateType<T extends MagicLinkTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateMagicLinkToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMagicLinkToken[P]>
      : GetScalarType<T[P], AggregateMagicLinkToken[P]>
  }




  export type MagicLinkTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MagicLinkTokenWhereInput
    orderBy?: MagicLinkTokenOrderByWithAggregationInput | MagicLinkTokenOrderByWithAggregationInput[]
    by: MagicLinkTokenScalarFieldEnum[] | MagicLinkTokenScalarFieldEnum
    having?: MagicLinkTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MagicLinkTokenCountAggregateInputType | true
    _min?: MagicLinkTokenMinAggregateInputType
    _max?: MagicLinkTokenMaxAggregateInputType
  }

  export type MagicLinkTokenGroupByOutputType = {
    id: string
    userId: string
    platform: string
    token: string
    expiresAt: Date
    usedAt: Date | null
    redirectUrl: string | null
    _count: MagicLinkTokenCountAggregateOutputType | null
    _min: MagicLinkTokenMinAggregateOutputType | null
    _max: MagicLinkTokenMaxAggregateOutputType | null
  }

  type GetMagicLinkTokenGroupByPayload<T extends MagicLinkTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MagicLinkTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MagicLinkTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MagicLinkTokenGroupByOutputType[P]>
            : GetScalarType<T[P], MagicLinkTokenGroupByOutputType[P]>
        }
      >
    >


  export type MagicLinkTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    token?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    redirectUrl?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["magicLinkToken"]>

  export type MagicLinkTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    token?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    redirectUrl?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["magicLinkToken"]>

  export type MagicLinkTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    platform?: boolean
    token?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    redirectUrl?: boolean
  }

  export type MagicLinkTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MagicLinkTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MagicLinkTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MagicLinkToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      platform: string
      token: string
      expiresAt: Date
      usedAt: Date | null
      redirectUrl: string | null
    }, ExtArgs["result"]["magicLinkToken"]>
    composites: {}
  }

  type MagicLinkTokenGetPayload<S extends boolean | null | undefined | MagicLinkTokenDefaultArgs> = $Result.GetResult<Prisma.$MagicLinkTokenPayload, S>

  type MagicLinkTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MagicLinkTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MagicLinkTokenCountAggregateInputType | true
    }

  export interface MagicLinkTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MagicLinkToken'], meta: { name: 'MagicLinkToken' } }
    /**
     * Find zero or one MagicLinkToken that matches the filter.
     * @param {MagicLinkTokenFindUniqueArgs} args - Arguments to find a MagicLinkToken
     * @example
     * // Get one MagicLinkToken
     * const magicLinkToken = await prisma.magicLinkToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MagicLinkTokenFindUniqueArgs>(args: SelectSubset<T, MagicLinkTokenFindUniqueArgs<ExtArgs>>): Prisma__MagicLinkTokenClient<$Result.GetResult<Prisma.$MagicLinkTokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MagicLinkToken that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MagicLinkTokenFindUniqueOrThrowArgs} args - Arguments to find a MagicLinkToken
     * @example
     * // Get one MagicLinkToken
     * const magicLinkToken = await prisma.magicLinkToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MagicLinkTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, MagicLinkTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MagicLinkTokenClient<$Result.GetResult<Prisma.$MagicLinkTokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MagicLinkToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicLinkTokenFindFirstArgs} args - Arguments to find a MagicLinkToken
     * @example
     * // Get one MagicLinkToken
     * const magicLinkToken = await prisma.magicLinkToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MagicLinkTokenFindFirstArgs>(args?: SelectSubset<T, MagicLinkTokenFindFirstArgs<ExtArgs>>): Prisma__MagicLinkTokenClient<$Result.GetResult<Prisma.$MagicLinkTokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MagicLinkToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicLinkTokenFindFirstOrThrowArgs} args - Arguments to find a MagicLinkToken
     * @example
     * // Get one MagicLinkToken
     * const magicLinkToken = await prisma.magicLinkToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MagicLinkTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, MagicLinkTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__MagicLinkTokenClient<$Result.GetResult<Prisma.$MagicLinkTokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MagicLinkTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicLinkTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MagicLinkTokens
     * const magicLinkTokens = await prisma.magicLinkToken.findMany()
     * 
     * // Get first 10 MagicLinkTokens
     * const magicLinkTokens = await prisma.magicLinkToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const magicLinkTokenWithIdOnly = await prisma.magicLinkToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MagicLinkTokenFindManyArgs>(args?: SelectSubset<T, MagicLinkTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MagicLinkTokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MagicLinkToken.
     * @param {MagicLinkTokenCreateArgs} args - Arguments to create a MagicLinkToken.
     * @example
     * // Create one MagicLinkToken
     * const MagicLinkToken = await prisma.magicLinkToken.create({
     *   data: {
     *     // ... data to create a MagicLinkToken
     *   }
     * })
     * 
     */
    create<T extends MagicLinkTokenCreateArgs>(args: SelectSubset<T, MagicLinkTokenCreateArgs<ExtArgs>>): Prisma__MagicLinkTokenClient<$Result.GetResult<Prisma.$MagicLinkTokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MagicLinkTokens.
     * @param {MagicLinkTokenCreateManyArgs} args - Arguments to create many MagicLinkTokens.
     * @example
     * // Create many MagicLinkTokens
     * const magicLinkToken = await prisma.magicLinkToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MagicLinkTokenCreateManyArgs>(args?: SelectSubset<T, MagicLinkTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MagicLinkTokens and returns the data saved in the database.
     * @param {MagicLinkTokenCreateManyAndReturnArgs} args - Arguments to create many MagicLinkTokens.
     * @example
     * // Create many MagicLinkTokens
     * const magicLinkToken = await prisma.magicLinkToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MagicLinkTokens and only return the `id`
     * const magicLinkTokenWithIdOnly = await prisma.magicLinkToken.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MagicLinkTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, MagicLinkTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MagicLinkTokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MagicLinkToken.
     * @param {MagicLinkTokenDeleteArgs} args - Arguments to delete one MagicLinkToken.
     * @example
     * // Delete one MagicLinkToken
     * const MagicLinkToken = await prisma.magicLinkToken.delete({
     *   where: {
     *     // ... filter to delete one MagicLinkToken
     *   }
     * })
     * 
     */
    delete<T extends MagicLinkTokenDeleteArgs>(args: SelectSubset<T, MagicLinkTokenDeleteArgs<ExtArgs>>): Prisma__MagicLinkTokenClient<$Result.GetResult<Prisma.$MagicLinkTokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MagicLinkToken.
     * @param {MagicLinkTokenUpdateArgs} args - Arguments to update one MagicLinkToken.
     * @example
     * // Update one MagicLinkToken
     * const magicLinkToken = await prisma.magicLinkToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MagicLinkTokenUpdateArgs>(args: SelectSubset<T, MagicLinkTokenUpdateArgs<ExtArgs>>): Prisma__MagicLinkTokenClient<$Result.GetResult<Prisma.$MagicLinkTokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MagicLinkTokens.
     * @param {MagicLinkTokenDeleteManyArgs} args - Arguments to filter MagicLinkTokens to delete.
     * @example
     * // Delete a few MagicLinkTokens
     * const { count } = await prisma.magicLinkToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MagicLinkTokenDeleteManyArgs>(args?: SelectSubset<T, MagicLinkTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MagicLinkTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicLinkTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MagicLinkTokens
     * const magicLinkToken = await prisma.magicLinkToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MagicLinkTokenUpdateManyArgs>(args: SelectSubset<T, MagicLinkTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MagicLinkToken.
     * @param {MagicLinkTokenUpsertArgs} args - Arguments to update or create a MagicLinkToken.
     * @example
     * // Update or create a MagicLinkToken
     * const magicLinkToken = await prisma.magicLinkToken.upsert({
     *   create: {
     *     // ... data to create a MagicLinkToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MagicLinkToken we want to update
     *   }
     * })
     */
    upsert<T extends MagicLinkTokenUpsertArgs>(args: SelectSubset<T, MagicLinkTokenUpsertArgs<ExtArgs>>): Prisma__MagicLinkTokenClient<$Result.GetResult<Prisma.$MagicLinkTokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MagicLinkTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicLinkTokenCountArgs} args - Arguments to filter MagicLinkTokens to count.
     * @example
     * // Count the number of MagicLinkTokens
     * const count = await prisma.magicLinkToken.count({
     *   where: {
     *     // ... the filter for the MagicLinkTokens we want to count
     *   }
     * })
    **/
    count<T extends MagicLinkTokenCountArgs>(
      args?: Subset<T, MagicLinkTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MagicLinkTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MagicLinkToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicLinkTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MagicLinkTokenAggregateArgs>(args: Subset<T, MagicLinkTokenAggregateArgs>): Prisma.PrismaPromise<GetMagicLinkTokenAggregateType<T>>

    /**
     * Group by MagicLinkToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicLinkTokenGroupByArgs} args - Group by arguments.
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
      T extends MagicLinkTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MagicLinkTokenGroupByArgs['orderBy'] }
        : { orderBy?: MagicLinkTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MagicLinkTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMagicLinkTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MagicLinkToken model
   */
  readonly fields: MagicLinkTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MagicLinkToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MagicLinkTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the MagicLinkToken model
   */ 
  interface MagicLinkTokenFieldRefs {
    readonly id: FieldRef<"MagicLinkToken", 'String'>
    readonly userId: FieldRef<"MagicLinkToken", 'String'>
    readonly platform: FieldRef<"MagicLinkToken", 'String'>
    readonly token: FieldRef<"MagicLinkToken", 'String'>
    readonly expiresAt: FieldRef<"MagicLinkToken", 'DateTime'>
    readonly usedAt: FieldRef<"MagicLinkToken", 'DateTime'>
    readonly redirectUrl: FieldRef<"MagicLinkToken", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MagicLinkToken findUnique
   */
  export type MagicLinkTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicLinkToken
     */
    select?: MagicLinkTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MagicLinkTokenInclude<ExtArgs> | null
    /**
     * Filter, which MagicLinkToken to fetch.
     */
    where: MagicLinkTokenWhereUniqueInput
  }

  /**
   * MagicLinkToken findUniqueOrThrow
   */
  export type MagicLinkTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicLinkToken
     */
    select?: MagicLinkTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MagicLinkTokenInclude<ExtArgs> | null
    /**
     * Filter, which MagicLinkToken to fetch.
     */
    where: MagicLinkTokenWhereUniqueInput
  }

  /**
   * MagicLinkToken findFirst
   */
  export type MagicLinkTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicLinkToken
     */
    select?: MagicLinkTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MagicLinkTokenInclude<ExtArgs> | null
    /**
     * Filter, which MagicLinkToken to fetch.
     */
    where?: MagicLinkTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MagicLinkTokens to fetch.
     */
    orderBy?: MagicLinkTokenOrderByWithRelationInput | MagicLinkTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MagicLinkTokens.
     */
    cursor?: MagicLinkTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MagicLinkTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MagicLinkTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MagicLinkTokens.
     */
    distinct?: MagicLinkTokenScalarFieldEnum | MagicLinkTokenScalarFieldEnum[]
  }

  /**
   * MagicLinkToken findFirstOrThrow
   */
  export type MagicLinkTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicLinkToken
     */
    select?: MagicLinkTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MagicLinkTokenInclude<ExtArgs> | null
    /**
     * Filter, which MagicLinkToken to fetch.
     */
    where?: MagicLinkTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MagicLinkTokens to fetch.
     */
    orderBy?: MagicLinkTokenOrderByWithRelationInput | MagicLinkTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MagicLinkTokens.
     */
    cursor?: MagicLinkTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MagicLinkTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MagicLinkTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MagicLinkTokens.
     */
    distinct?: MagicLinkTokenScalarFieldEnum | MagicLinkTokenScalarFieldEnum[]
  }

  /**
   * MagicLinkToken findMany
   */
  export type MagicLinkTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicLinkToken
     */
    select?: MagicLinkTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MagicLinkTokenInclude<ExtArgs> | null
    /**
     * Filter, which MagicLinkTokens to fetch.
     */
    where?: MagicLinkTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MagicLinkTokens to fetch.
     */
    orderBy?: MagicLinkTokenOrderByWithRelationInput | MagicLinkTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MagicLinkTokens.
     */
    cursor?: MagicLinkTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MagicLinkTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MagicLinkTokens.
     */
    skip?: number
    distinct?: MagicLinkTokenScalarFieldEnum | MagicLinkTokenScalarFieldEnum[]
  }

  /**
   * MagicLinkToken create
   */
  export type MagicLinkTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicLinkToken
     */
    select?: MagicLinkTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MagicLinkTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a MagicLinkToken.
     */
    data: XOR<MagicLinkTokenCreateInput, MagicLinkTokenUncheckedCreateInput>
  }

  /**
   * MagicLinkToken createMany
   */
  export type MagicLinkTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MagicLinkTokens.
     */
    data: MagicLinkTokenCreateManyInput | MagicLinkTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MagicLinkToken createManyAndReturn
   */
  export type MagicLinkTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicLinkToken
     */
    select?: MagicLinkTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MagicLinkTokens.
     */
    data: MagicLinkTokenCreateManyInput | MagicLinkTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MagicLinkTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MagicLinkToken update
   */
  export type MagicLinkTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicLinkToken
     */
    select?: MagicLinkTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MagicLinkTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a MagicLinkToken.
     */
    data: XOR<MagicLinkTokenUpdateInput, MagicLinkTokenUncheckedUpdateInput>
    /**
     * Choose, which MagicLinkToken to update.
     */
    where: MagicLinkTokenWhereUniqueInput
  }

  /**
   * MagicLinkToken updateMany
   */
  export type MagicLinkTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MagicLinkTokens.
     */
    data: XOR<MagicLinkTokenUpdateManyMutationInput, MagicLinkTokenUncheckedUpdateManyInput>
    /**
     * Filter which MagicLinkTokens to update
     */
    where?: MagicLinkTokenWhereInput
  }

  /**
   * MagicLinkToken upsert
   */
  export type MagicLinkTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicLinkToken
     */
    select?: MagicLinkTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MagicLinkTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the MagicLinkToken to update in case it exists.
     */
    where: MagicLinkTokenWhereUniqueInput
    /**
     * In case the MagicLinkToken found by the `where` argument doesn't exist, create a new MagicLinkToken with this data.
     */
    create: XOR<MagicLinkTokenCreateInput, MagicLinkTokenUncheckedCreateInput>
    /**
     * In case the MagicLinkToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MagicLinkTokenUpdateInput, MagicLinkTokenUncheckedUpdateInput>
  }

  /**
   * MagicLinkToken delete
   */
  export type MagicLinkTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicLinkToken
     */
    select?: MagicLinkTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MagicLinkTokenInclude<ExtArgs> | null
    /**
     * Filter which MagicLinkToken to delete.
     */
    where: MagicLinkTokenWhereUniqueInput
  }

  /**
   * MagicLinkToken deleteMany
   */
  export type MagicLinkTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MagicLinkTokens to delete
     */
    where?: MagicLinkTokenWhereInput
  }

  /**
   * MagicLinkToken without action
   */
  export type MagicLinkTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicLinkToken
     */
    select?: MagicLinkTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MagicLinkTokenInclude<ExtArgs> | null
  }


  /**
   * Model Log
   */

  export type AggregateLog = {
    _count: LogCountAggregateOutputType | null
    _avg: LogAvgAggregateOutputType | null
    _sum: LogSumAggregateOutputType | null
    _min: LogMinAggregateOutputType | null
    _max: LogMaxAggregateOutputType | null
  }

  export type LogAvgAggregateOutputType = {
    latencyMs: number | null
  }

  export type LogSumAggregateOutputType = {
    latencyMs: number | null
  }

  export type LogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    platformMessageId: string | null
    messageTimestamp: Date | null
    rawText: string | null
    intent: string | null
    processingStatus: string | null
    clarificationPrompt: string | null
    clarificationResponse: string | null
    latencyMs: number | null
    errorCode: string | null
    errorMessage: string | null
    createdAt: Date | null
  }

  export type LogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    platformMessageId: string | null
    messageTimestamp: Date | null
    rawText: string | null
    intent: string | null
    processingStatus: string | null
    clarificationPrompt: string | null
    clarificationResponse: string | null
    latencyMs: number | null
    errorCode: string | null
    errorMessage: string | null
    createdAt: Date | null
  }

  export type LogCountAggregateOutputType = {
    id: number
    userId: number
    platform: number
    platformMessageId: number
    messageTimestamp: number
    rawText: number
    llmOutput: number
    intent: number
    processingStatus: number
    clarificationPrompt: number
    clarificationResponse: number
    latencyMs: number
    errorCode: number
    errorMessage: number
    createdAt: number
    _all: number
  }


  export type LogAvgAggregateInputType = {
    latencyMs?: true
  }

  export type LogSumAggregateInputType = {
    latencyMs?: true
  }

  export type LogMinAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    platformMessageId?: true
    messageTimestamp?: true
    rawText?: true
    intent?: true
    processingStatus?: true
    clarificationPrompt?: true
    clarificationResponse?: true
    latencyMs?: true
    errorCode?: true
    errorMessage?: true
    createdAt?: true
  }

  export type LogMaxAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    platformMessageId?: true
    messageTimestamp?: true
    rawText?: true
    intent?: true
    processingStatus?: true
    clarificationPrompt?: true
    clarificationResponse?: true
    latencyMs?: true
    errorCode?: true
    errorMessage?: true
    createdAt?: true
  }

  export type LogCountAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    platformMessageId?: true
    messageTimestamp?: true
    rawText?: true
    llmOutput?: true
    intent?: true
    processingStatus?: true
    clarificationPrompt?: true
    clarificationResponse?: true
    latencyMs?: true
    errorCode?: true
    errorMessage?: true
    createdAt?: true
    _all?: true
  }

  export type LogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Log to aggregate.
     */
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     */
    orderBy?: LogOrderByWithRelationInput | LogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Logs
    **/
    _count?: true | LogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogMaxAggregateInputType
  }

  export type GetLogAggregateType<T extends LogAggregateArgs> = {
        [P in keyof T & keyof AggregateLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLog[P]>
      : GetScalarType<T[P], AggregateLog[P]>
  }




  export type LogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogWhereInput
    orderBy?: LogOrderByWithAggregationInput | LogOrderByWithAggregationInput[]
    by: LogScalarFieldEnum[] | LogScalarFieldEnum
    having?: LogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogCountAggregateInputType | true
    _avg?: LogAvgAggregateInputType
    _sum?: LogSumAggregateInputType
    _min?: LogMinAggregateInputType
    _max?: LogMaxAggregateInputType
  }

  export type LogGroupByOutputType = {
    id: string
    userId: string
    platform: string
    platformMessageId: string | null
    messageTimestamp: Date | null
    rawText: string
    llmOutput: JsonValue | null
    intent: string | null
    processingStatus: string
    clarificationPrompt: string | null
    clarificationResponse: string | null
    latencyMs: number | null
    errorCode: string | null
    errorMessage: string | null
    createdAt: Date
    _count: LogCountAggregateOutputType | null
    _avg: LogAvgAggregateOutputType | null
    _sum: LogSumAggregateOutputType | null
    _min: LogMinAggregateOutputType | null
    _max: LogMaxAggregateOutputType | null
  }

  type GetLogGroupByPayload<T extends LogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogGroupByOutputType[P]>
            : GetScalarType<T[P], LogGroupByOutputType[P]>
        }
      >
    >


  export type LogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    platformMessageId?: boolean
    messageTimestamp?: boolean
    rawText?: boolean
    llmOutput?: boolean
    intent?: boolean
    processingStatus?: boolean
    clarificationPrompt?: boolean
    clarificationResponse?: boolean
    latencyMs?: boolean
    errorCode?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    meals?: boolean | Log$mealsArgs<ExtArgs>
    editHistory?: boolean | Log$editHistoryArgs<ExtArgs>
    _count?: boolean | LogCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["log"]>

  export type LogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    platformMessageId?: boolean
    messageTimestamp?: boolean
    rawText?: boolean
    llmOutput?: boolean
    intent?: boolean
    processingStatus?: boolean
    clarificationPrompt?: boolean
    clarificationResponse?: boolean
    latencyMs?: boolean
    errorCode?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["log"]>

  export type LogSelectScalar = {
    id?: boolean
    userId?: boolean
    platform?: boolean
    platformMessageId?: boolean
    messageTimestamp?: boolean
    rawText?: boolean
    llmOutput?: boolean
    intent?: boolean
    processingStatus?: boolean
    clarificationPrompt?: boolean
    clarificationResponse?: boolean
    latencyMs?: boolean
    errorCode?: boolean
    errorMessage?: boolean
    createdAt?: boolean
  }

  export type LogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    meals?: boolean | Log$mealsArgs<ExtArgs>
    editHistory?: boolean | Log$editHistoryArgs<ExtArgs>
    _count?: boolean | LogCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Log"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      meals: Prisma.$MealPayload<ExtArgs>[]
      editHistory: Prisma.$EditHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      platform: string
      platformMessageId: string | null
      messageTimestamp: Date | null
      rawText: string
      llmOutput: Prisma.JsonValue | null
      intent: string | null
      processingStatus: string
      clarificationPrompt: string | null
      clarificationResponse: string | null
      latencyMs: number | null
      errorCode: string | null
      errorMessage: string | null
      createdAt: Date
    }, ExtArgs["result"]["log"]>
    composites: {}
  }

  type LogGetPayload<S extends boolean | null | undefined | LogDefaultArgs> = $Result.GetResult<Prisma.$LogPayload, S>

  type LogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LogCountAggregateInputType | true
    }

  export interface LogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Log'], meta: { name: 'Log' } }
    /**
     * Find zero or one Log that matches the filter.
     * @param {LogFindUniqueArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LogFindUniqueArgs>(args: SelectSubset<T, LogFindUniqueArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Log that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LogFindUniqueOrThrowArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LogFindUniqueOrThrowArgs>(args: SelectSubset<T, LogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Log that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindFirstArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LogFindFirstArgs>(args?: SelectSubset<T, LogFindFirstArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Log that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindFirstOrThrowArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LogFindFirstOrThrowArgs>(args?: SelectSubset<T, LogFindFirstOrThrowArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Logs
     * const logs = await prisma.log.findMany()
     * 
     * // Get first 10 Logs
     * const logs = await prisma.log.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const logWithIdOnly = await prisma.log.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LogFindManyArgs>(args?: SelectSubset<T, LogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Log.
     * @param {LogCreateArgs} args - Arguments to create a Log.
     * @example
     * // Create one Log
     * const Log = await prisma.log.create({
     *   data: {
     *     // ... data to create a Log
     *   }
     * })
     * 
     */
    create<T extends LogCreateArgs>(args: SelectSubset<T, LogCreateArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Logs.
     * @param {LogCreateManyArgs} args - Arguments to create many Logs.
     * @example
     * // Create many Logs
     * const log = await prisma.log.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LogCreateManyArgs>(args?: SelectSubset<T, LogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Logs and returns the data saved in the database.
     * @param {LogCreateManyAndReturnArgs} args - Arguments to create many Logs.
     * @example
     * // Create many Logs
     * const log = await prisma.log.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Logs and only return the `id`
     * const logWithIdOnly = await prisma.log.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LogCreateManyAndReturnArgs>(args?: SelectSubset<T, LogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Log.
     * @param {LogDeleteArgs} args - Arguments to delete one Log.
     * @example
     * // Delete one Log
     * const Log = await prisma.log.delete({
     *   where: {
     *     // ... filter to delete one Log
     *   }
     * })
     * 
     */
    delete<T extends LogDeleteArgs>(args: SelectSubset<T, LogDeleteArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Log.
     * @param {LogUpdateArgs} args - Arguments to update one Log.
     * @example
     * // Update one Log
     * const log = await prisma.log.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LogUpdateArgs>(args: SelectSubset<T, LogUpdateArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Logs.
     * @param {LogDeleteManyArgs} args - Arguments to filter Logs to delete.
     * @example
     * // Delete a few Logs
     * const { count } = await prisma.log.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LogDeleteManyArgs>(args?: SelectSubset<T, LogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Logs
     * const log = await prisma.log.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LogUpdateManyArgs>(args: SelectSubset<T, LogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Log.
     * @param {LogUpsertArgs} args - Arguments to update or create a Log.
     * @example
     * // Update or create a Log
     * const log = await prisma.log.upsert({
     *   create: {
     *     // ... data to create a Log
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Log we want to update
     *   }
     * })
     */
    upsert<T extends LogUpsertArgs>(args: SelectSubset<T, LogUpsertArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogCountArgs} args - Arguments to filter Logs to count.
     * @example
     * // Count the number of Logs
     * const count = await prisma.log.count({
     *   where: {
     *     // ... the filter for the Logs we want to count
     *   }
     * })
    **/
    count<T extends LogCountArgs>(
      args?: Subset<T, LogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LogAggregateArgs>(args: Subset<T, LogAggregateArgs>): Prisma.PrismaPromise<GetLogAggregateType<T>>

    /**
     * Group by Log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogGroupByArgs} args - Group by arguments.
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
      T extends LogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LogGroupByArgs['orderBy'] }
        : { orderBy?: LogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Log model
   */
  readonly fields: LogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Log.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    meals<T extends Log$mealsArgs<ExtArgs> = {}>(args?: Subset<T, Log$mealsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findMany"> | Null>
    editHistory<T extends Log$editHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Log$editHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EditHistoryPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Log model
   */ 
  interface LogFieldRefs {
    readonly id: FieldRef<"Log", 'String'>
    readonly userId: FieldRef<"Log", 'String'>
    readonly platform: FieldRef<"Log", 'String'>
    readonly platformMessageId: FieldRef<"Log", 'String'>
    readonly messageTimestamp: FieldRef<"Log", 'DateTime'>
    readonly rawText: FieldRef<"Log", 'String'>
    readonly llmOutput: FieldRef<"Log", 'Json'>
    readonly intent: FieldRef<"Log", 'String'>
    readonly processingStatus: FieldRef<"Log", 'String'>
    readonly clarificationPrompt: FieldRef<"Log", 'String'>
    readonly clarificationResponse: FieldRef<"Log", 'String'>
    readonly latencyMs: FieldRef<"Log", 'Int'>
    readonly errorCode: FieldRef<"Log", 'String'>
    readonly errorMessage: FieldRef<"Log", 'String'>
    readonly createdAt: FieldRef<"Log", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Log findUnique
   */
  export type LogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogInclude<ExtArgs> | null
    /**
     * Filter, which Log to fetch.
     */
    where: LogWhereUniqueInput
  }

  /**
   * Log findUniqueOrThrow
   */
  export type LogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogInclude<ExtArgs> | null
    /**
     * Filter, which Log to fetch.
     */
    where: LogWhereUniqueInput
  }

  /**
   * Log findFirst
   */
  export type LogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogInclude<ExtArgs> | null
    /**
     * Filter, which Log to fetch.
     */
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     */
    orderBy?: LogOrderByWithRelationInput | LogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Logs.
     */
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Logs.
     */
    distinct?: LogScalarFieldEnum | LogScalarFieldEnum[]
  }

  /**
   * Log findFirstOrThrow
   */
  export type LogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogInclude<ExtArgs> | null
    /**
     * Filter, which Log to fetch.
     */
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     */
    orderBy?: LogOrderByWithRelationInput | LogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Logs.
     */
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Logs.
     */
    distinct?: LogScalarFieldEnum | LogScalarFieldEnum[]
  }

  /**
   * Log findMany
   */
  export type LogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogInclude<ExtArgs> | null
    /**
     * Filter, which Logs to fetch.
     */
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     */
    orderBy?: LogOrderByWithRelationInput | LogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Logs.
     */
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     */
    skip?: number
    distinct?: LogScalarFieldEnum | LogScalarFieldEnum[]
  }

  /**
   * Log create
   */
  export type LogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogInclude<ExtArgs> | null
    /**
     * The data needed to create a Log.
     */
    data: XOR<LogCreateInput, LogUncheckedCreateInput>
  }

  /**
   * Log createMany
   */
  export type LogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Logs.
     */
    data: LogCreateManyInput | LogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Log createManyAndReturn
   */
  export type LogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Logs.
     */
    data: LogCreateManyInput | LogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Log update
   */
  export type LogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogInclude<ExtArgs> | null
    /**
     * The data needed to update a Log.
     */
    data: XOR<LogUpdateInput, LogUncheckedUpdateInput>
    /**
     * Choose, which Log to update.
     */
    where: LogWhereUniqueInput
  }

  /**
   * Log updateMany
   */
  export type LogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Logs.
     */
    data: XOR<LogUpdateManyMutationInput, LogUncheckedUpdateManyInput>
    /**
     * Filter which Logs to update
     */
    where?: LogWhereInput
  }

  /**
   * Log upsert
   */
  export type LogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogInclude<ExtArgs> | null
    /**
     * The filter to search for the Log to update in case it exists.
     */
    where: LogWhereUniqueInput
    /**
     * In case the Log found by the `where` argument doesn't exist, create a new Log with this data.
     */
    create: XOR<LogCreateInput, LogUncheckedCreateInput>
    /**
     * In case the Log was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LogUpdateInput, LogUncheckedUpdateInput>
  }

  /**
   * Log delete
   */
  export type LogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogInclude<ExtArgs> | null
    /**
     * Filter which Log to delete.
     */
    where: LogWhereUniqueInput
  }

  /**
   * Log deleteMany
   */
  export type LogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Logs to delete
     */
    where?: LogWhereInput
  }

  /**
   * Log.meals
   */
  export type Log$mealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    where?: MealWhereInput
    orderBy?: MealOrderByWithRelationInput | MealOrderByWithRelationInput[]
    cursor?: MealWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MealScalarFieldEnum | MealScalarFieldEnum[]
  }

  /**
   * Log.editHistory
   */
  export type Log$editHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryInclude<ExtArgs> | null
    where?: EditHistoryWhereInput
    orderBy?: EditHistoryOrderByWithRelationInput | EditHistoryOrderByWithRelationInput[]
    cursor?: EditHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EditHistoryScalarFieldEnum | EditHistoryScalarFieldEnum[]
  }

  /**
   * Log without action
   */
  export type LogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogInclude<ExtArgs> | null
  }


  /**
   * Model Meal
   */

  export type AggregateMeal = {
    _count: MealCountAggregateOutputType | null
    _avg: MealAvgAggregateOutputType | null
    _sum: MealSumAggregateOutputType | null
    _min: MealMinAggregateOutputType | null
    _max: MealMaxAggregateOutputType | null
  }

  export type MealAvgAggregateOutputType = {
    totalCalories: number | null
    totalProteinG: number | null
    totalCarbsG: number | null
    totalFatG: number | null
  }

  export type MealSumAggregateOutputType = {
    totalCalories: number | null
    totalProteinG: number | null
    totalCarbsG: number | null
    totalFatG: number | null
  }

  export type MealMinAggregateOutputType = {
    id: string | null
    userId: string | null
    sourceLogId: string | null
    occasion: string | null
    consumedAt: Date | null
    createdAt: Date | null
    totalCalories: number | null
    totalProteinG: number | null
    totalCarbsG: number | null
    totalFatG: number | null
  }

  export type MealMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    sourceLogId: string | null
    occasion: string | null
    consumedAt: Date | null
    createdAt: Date | null
    totalCalories: number | null
    totalProteinG: number | null
    totalCarbsG: number | null
    totalFatG: number | null
  }

  export type MealCountAggregateOutputType = {
    id: number
    userId: number
    sourceLogId: number
    occasion: number
    consumedAt: number
    createdAt: number
    totalCalories: number
    totalProteinG: number
    totalCarbsG: number
    totalFatG: number
    _all: number
  }


  export type MealAvgAggregateInputType = {
    totalCalories?: true
    totalProteinG?: true
    totalCarbsG?: true
    totalFatG?: true
  }

  export type MealSumAggregateInputType = {
    totalCalories?: true
    totalProteinG?: true
    totalCarbsG?: true
    totalFatG?: true
  }

  export type MealMinAggregateInputType = {
    id?: true
    userId?: true
    sourceLogId?: true
    occasion?: true
    consumedAt?: true
    createdAt?: true
    totalCalories?: true
    totalProteinG?: true
    totalCarbsG?: true
    totalFatG?: true
  }

  export type MealMaxAggregateInputType = {
    id?: true
    userId?: true
    sourceLogId?: true
    occasion?: true
    consumedAt?: true
    createdAt?: true
    totalCalories?: true
    totalProteinG?: true
    totalCarbsG?: true
    totalFatG?: true
  }

  export type MealCountAggregateInputType = {
    id?: true
    userId?: true
    sourceLogId?: true
    occasion?: true
    consumedAt?: true
    createdAt?: true
    totalCalories?: true
    totalProteinG?: true
    totalCarbsG?: true
    totalFatG?: true
    _all?: true
  }

  export type MealAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meal to aggregate.
     */
    where?: MealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meals to fetch.
     */
    orderBy?: MealOrderByWithRelationInput | MealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Meals
    **/
    _count?: true | MealCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MealAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MealSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MealMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MealMaxAggregateInputType
  }

  export type GetMealAggregateType<T extends MealAggregateArgs> = {
        [P in keyof T & keyof AggregateMeal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeal[P]>
      : GetScalarType<T[P], AggregateMeal[P]>
  }




  export type MealGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealWhereInput
    orderBy?: MealOrderByWithAggregationInput | MealOrderByWithAggregationInput[]
    by: MealScalarFieldEnum[] | MealScalarFieldEnum
    having?: MealScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MealCountAggregateInputType | true
    _avg?: MealAvgAggregateInputType
    _sum?: MealSumAggregateInputType
    _min?: MealMinAggregateInputType
    _max?: MealMaxAggregateInputType
  }

  export type MealGroupByOutputType = {
    id: string
    userId: string
    sourceLogId: string | null
    occasion: string | null
    consumedAt: Date
    createdAt: Date
    totalCalories: number | null
    totalProteinG: number | null
    totalCarbsG: number | null
    totalFatG: number | null
    _count: MealCountAggregateOutputType | null
    _avg: MealAvgAggregateOutputType | null
    _sum: MealSumAggregateOutputType | null
    _min: MealMinAggregateOutputType | null
    _max: MealMaxAggregateOutputType | null
  }

  type GetMealGroupByPayload<T extends MealGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MealGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MealGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MealGroupByOutputType[P]>
            : GetScalarType<T[P], MealGroupByOutputType[P]>
        }
      >
    >


  export type MealSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceLogId?: boolean
    occasion?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    totalCalories?: boolean
    totalProteinG?: boolean
    totalCarbsG?: boolean
    totalFatG?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    sourceLog?: boolean | Meal$sourceLogArgs<ExtArgs>
    items?: boolean | Meal$itemsArgs<ExtArgs>
    editHistory?: boolean | Meal$editHistoryArgs<ExtArgs>
    _count?: boolean | MealCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meal"]>

  export type MealSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceLogId?: boolean
    occasion?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    totalCalories?: boolean
    totalProteinG?: boolean
    totalCarbsG?: boolean
    totalFatG?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    sourceLog?: boolean | Meal$sourceLogArgs<ExtArgs>
  }, ExtArgs["result"]["meal"]>

  export type MealSelectScalar = {
    id?: boolean
    userId?: boolean
    sourceLogId?: boolean
    occasion?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    totalCalories?: boolean
    totalProteinG?: boolean
    totalCarbsG?: boolean
    totalFatG?: boolean
  }

  export type MealInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    sourceLog?: boolean | Meal$sourceLogArgs<ExtArgs>
    items?: boolean | Meal$itemsArgs<ExtArgs>
    editHistory?: boolean | Meal$editHistoryArgs<ExtArgs>
    _count?: boolean | MealCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MealIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    sourceLog?: boolean | Meal$sourceLogArgs<ExtArgs>
  }

  export type $MealPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Meal"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      sourceLog: Prisma.$LogPayload<ExtArgs> | null
      items: Prisma.$MealItemPayload<ExtArgs>[]
      editHistory: Prisma.$EditHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      sourceLogId: string | null
      occasion: string | null
      consumedAt: Date
      createdAt: Date
      totalCalories: number | null
      totalProteinG: number | null
      totalCarbsG: number | null
      totalFatG: number | null
    }, ExtArgs["result"]["meal"]>
    composites: {}
  }

  type MealGetPayload<S extends boolean | null | undefined | MealDefaultArgs> = $Result.GetResult<Prisma.$MealPayload, S>

  type MealCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MealFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MealCountAggregateInputType | true
    }

  export interface MealDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Meal'], meta: { name: 'Meal' } }
    /**
     * Find zero or one Meal that matches the filter.
     * @param {MealFindUniqueArgs} args - Arguments to find a Meal
     * @example
     * // Get one Meal
     * const meal = await prisma.meal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MealFindUniqueArgs>(args: SelectSubset<T, MealFindUniqueArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Meal that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MealFindUniqueOrThrowArgs} args - Arguments to find a Meal
     * @example
     * // Get one Meal
     * const meal = await prisma.meal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MealFindUniqueOrThrowArgs>(args: SelectSubset<T, MealFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Meal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealFindFirstArgs} args - Arguments to find a Meal
     * @example
     * // Get one Meal
     * const meal = await prisma.meal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MealFindFirstArgs>(args?: SelectSubset<T, MealFindFirstArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Meal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealFindFirstOrThrowArgs} args - Arguments to find a Meal
     * @example
     * // Get one Meal
     * const meal = await prisma.meal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MealFindFirstOrThrowArgs>(args?: SelectSubset<T, MealFindFirstOrThrowArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Meals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Meals
     * const meals = await prisma.meal.findMany()
     * 
     * // Get first 10 Meals
     * const meals = await prisma.meal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mealWithIdOnly = await prisma.meal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MealFindManyArgs>(args?: SelectSubset<T, MealFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Meal.
     * @param {MealCreateArgs} args - Arguments to create a Meal.
     * @example
     * // Create one Meal
     * const Meal = await prisma.meal.create({
     *   data: {
     *     // ... data to create a Meal
     *   }
     * })
     * 
     */
    create<T extends MealCreateArgs>(args: SelectSubset<T, MealCreateArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Meals.
     * @param {MealCreateManyArgs} args - Arguments to create many Meals.
     * @example
     * // Create many Meals
     * const meal = await prisma.meal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MealCreateManyArgs>(args?: SelectSubset<T, MealCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Meals and returns the data saved in the database.
     * @param {MealCreateManyAndReturnArgs} args - Arguments to create many Meals.
     * @example
     * // Create many Meals
     * const meal = await prisma.meal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Meals and only return the `id`
     * const mealWithIdOnly = await prisma.meal.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MealCreateManyAndReturnArgs>(args?: SelectSubset<T, MealCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Meal.
     * @param {MealDeleteArgs} args - Arguments to delete one Meal.
     * @example
     * // Delete one Meal
     * const Meal = await prisma.meal.delete({
     *   where: {
     *     // ... filter to delete one Meal
     *   }
     * })
     * 
     */
    delete<T extends MealDeleteArgs>(args: SelectSubset<T, MealDeleteArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Meal.
     * @param {MealUpdateArgs} args - Arguments to update one Meal.
     * @example
     * // Update one Meal
     * const meal = await prisma.meal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MealUpdateArgs>(args: SelectSubset<T, MealUpdateArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Meals.
     * @param {MealDeleteManyArgs} args - Arguments to filter Meals to delete.
     * @example
     * // Delete a few Meals
     * const { count } = await prisma.meal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MealDeleteManyArgs>(args?: SelectSubset<T, MealDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Meals
     * const meal = await prisma.meal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MealUpdateManyArgs>(args: SelectSubset<T, MealUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Meal.
     * @param {MealUpsertArgs} args - Arguments to update or create a Meal.
     * @example
     * // Update or create a Meal
     * const meal = await prisma.meal.upsert({
     *   create: {
     *     // ... data to create a Meal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Meal we want to update
     *   }
     * })
     */
    upsert<T extends MealUpsertArgs>(args: SelectSubset<T, MealUpsertArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Meals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealCountArgs} args - Arguments to filter Meals to count.
     * @example
     * // Count the number of Meals
     * const count = await prisma.meal.count({
     *   where: {
     *     // ... the filter for the Meals we want to count
     *   }
     * })
    **/
    count<T extends MealCountArgs>(
      args?: Subset<T, MealCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MealCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Meal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MealAggregateArgs>(args: Subset<T, MealAggregateArgs>): Prisma.PrismaPromise<GetMealAggregateType<T>>

    /**
     * Group by Meal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealGroupByArgs} args - Group by arguments.
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
      T extends MealGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MealGroupByArgs['orderBy'] }
        : { orderBy?: MealGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MealGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMealGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Meal model
   */
  readonly fields: MealFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Meal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MealClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    sourceLog<T extends Meal$sourceLogArgs<ExtArgs> = {}>(args?: Subset<T, Meal$sourceLogArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    items<T extends Meal$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Meal$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "findMany"> | Null>
    editHistory<T extends Meal$editHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Meal$editHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EditHistoryPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Meal model
   */ 
  interface MealFieldRefs {
    readonly id: FieldRef<"Meal", 'String'>
    readonly userId: FieldRef<"Meal", 'String'>
    readonly sourceLogId: FieldRef<"Meal", 'String'>
    readonly occasion: FieldRef<"Meal", 'String'>
    readonly consumedAt: FieldRef<"Meal", 'DateTime'>
    readonly createdAt: FieldRef<"Meal", 'DateTime'>
    readonly totalCalories: FieldRef<"Meal", 'Int'>
    readonly totalProteinG: FieldRef<"Meal", 'Float'>
    readonly totalCarbsG: FieldRef<"Meal", 'Float'>
    readonly totalFatG: FieldRef<"Meal", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Meal findUnique
   */
  export type MealFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * Filter, which Meal to fetch.
     */
    where: MealWhereUniqueInput
  }

  /**
   * Meal findUniqueOrThrow
   */
  export type MealFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * Filter, which Meal to fetch.
     */
    where: MealWhereUniqueInput
  }

  /**
   * Meal findFirst
   */
  export type MealFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * Filter, which Meal to fetch.
     */
    where?: MealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meals to fetch.
     */
    orderBy?: MealOrderByWithRelationInput | MealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meals.
     */
    cursor?: MealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meals.
     */
    distinct?: MealScalarFieldEnum | MealScalarFieldEnum[]
  }

  /**
   * Meal findFirstOrThrow
   */
  export type MealFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * Filter, which Meal to fetch.
     */
    where?: MealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meals to fetch.
     */
    orderBy?: MealOrderByWithRelationInput | MealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meals.
     */
    cursor?: MealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meals.
     */
    distinct?: MealScalarFieldEnum | MealScalarFieldEnum[]
  }

  /**
   * Meal findMany
   */
  export type MealFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * Filter, which Meals to fetch.
     */
    where?: MealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meals to fetch.
     */
    orderBy?: MealOrderByWithRelationInput | MealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Meals.
     */
    cursor?: MealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meals.
     */
    skip?: number
    distinct?: MealScalarFieldEnum | MealScalarFieldEnum[]
  }

  /**
   * Meal create
   */
  export type MealCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * The data needed to create a Meal.
     */
    data: XOR<MealCreateInput, MealUncheckedCreateInput>
  }

  /**
   * Meal createMany
   */
  export type MealCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Meals.
     */
    data: MealCreateManyInput | MealCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Meal createManyAndReturn
   */
  export type MealCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Meals.
     */
    data: MealCreateManyInput | MealCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Meal update
   */
  export type MealUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * The data needed to update a Meal.
     */
    data: XOR<MealUpdateInput, MealUncheckedUpdateInput>
    /**
     * Choose, which Meal to update.
     */
    where: MealWhereUniqueInput
  }

  /**
   * Meal updateMany
   */
  export type MealUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Meals.
     */
    data: XOR<MealUpdateManyMutationInput, MealUncheckedUpdateManyInput>
    /**
     * Filter which Meals to update
     */
    where?: MealWhereInput
  }

  /**
   * Meal upsert
   */
  export type MealUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * The filter to search for the Meal to update in case it exists.
     */
    where: MealWhereUniqueInput
    /**
     * In case the Meal found by the `where` argument doesn't exist, create a new Meal with this data.
     */
    create: XOR<MealCreateInput, MealUncheckedCreateInput>
    /**
     * In case the Meal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MealUpdateInput, MealUncheckedUpdateInput>
  }

  /**
   * Meal delete
   */
  export type MealDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
    /**
     * Filter which Meal to delete.
     */
    where: MealWhereUniqueInput
  }

  /**
   * Meal deleteMany
   */
  export type MealDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meals to delete
     */
    where?: MealWhereInput
  }

  /**
   * Meal.sourceLog
   */
  export type Meal$sourceLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogInclude<ExtArgs> | null
    where?: LogWhereInput
  }

  /**
   * Meal.items
   */
  export type Meal$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    where?: MealItemWhereInput
    orderBy?: MealItemOrderByWithRelationInput | MealItemOrderByWithRelationInput[]
    cursor?: MealItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MealItemScalarFieldEnum | MealItemScalarFieldEnum[]
  }

  /**
   * Meal.editHistory
   */
  export type Meal$editHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryInclude<ExtArgs> | null
    where?: EditHistoryWhereInput
    orderBy?: EditHistoryOrderByWithRelationInput | EditHistoryOrderByWithRelationInput[]
    cursor?: EditHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EditHistoryScalarFieldEnum | EditHistoryScalarFieldEnum[]
  }

  /**
   * Meal without action
   */
  export type MealDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meal
     */
    select?: MealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealInclude<ExtArgs> | null
  }


  /**
   * Model MealItem
   */

  export type AggregateMealItem = {
    _count: MealItemCountAggregateOutputType | null
    _avg: MealItemAvgAggregateOutputType | null
    _sum: MealItemSumAggregateOutputType | null
    _min: MealItemMinAggregateOutputType | null
    _max: MealItemMaxAggregateOutputType | null
  }

  export type MealItemAvgAggregateOutputType = {
    quantity: number | null
    weightG: number | null
    calories: number | null
    proteinG: number | null
    carbsG: number | null
    fatG: number | null
  }

  export type MealItemSumAggregateOutputType = {
    quantity: number | null
    weightG: number | null
    calories: number | null
    proteinG: number | null
    carbsG: number | null
    fatG: number | null
  }

  export type MealItemMinAggregateOutputType = {
    id: string | null
    mealId: string | null
    foodName: string | null
    quantity: number | null
    unit: string | null
    weightG: number | null
    calories: number | null
    proteinG: number | null
    carbsG: number | null
    fatG: number | null
    nutritionApi: string | null
    apiRefId: string | null
    resolutionConfidence: string | null
    notes: string | null
  }

  export type MealItemMaxAggregateOutputType = {
    id: string | null
    mealId: string | null
    foodName: string | null
    quantity: number | null
    unit: string | null
    weightG: number | null
    calories: number | null
    proteinG: number | null
    carbsG: number | null
    fatG: number | null
    nutritionApi: string | null
    apiRefId: string | null
    resolutionConfidence: string | null
    notes: string | null
  }

  export type MealItemCountAggregateOutputType = {
    id: number
    mealId: number
    foodName: number
    quantity: number
    unit: number
    weightG: number
    calories: number
    proteinG: number
    carbsG: number
    fatG: number
    nutritionApi: number
    apiRefId: number
    apiResponseSnapshot: number
    resolutionConfidence: number
    notes: number
    _all: number
  }


  export type MealItemAvgAggregateInputType = {
    quantity?: true
    weightG?: true
    calories?: true
    proteinG?: true
    carbsG?: true
    fatG?: true
  }

  export type MealItemSumAggregateInputType = {
    quantity?: true
    weightG?: true
    calories?: true
    proteinG?: true
    carbsG?: true
    fatG?: true
  }

  export type MealItemMinAggregateInputType = {
    id?: true
    mealId?: true
    foodName?: true
    quantity?: true
    unit?: true
    weightG?: true
    calories?: true
    proteinG?: true
    carbsG?: true
    fatG?: true
    nutritionApi?: true
    apiRefId?: true
    resolutionConfidence?: true
    notes?: true
  }

  export type MealItemMaxAggregateInputType = {
    id?: true
    mealId?: true
    foodName?: true
    quantity?: true
    unit?: true
    weightG?: true
    calories?: true
    proteinG?: true
    carbsG?: true
    fatG?: true
    nutritionApi?: true
    apiRefId?: true
    resolutionConfidence?: true
    notes?: true
  }

  export type MealItemCountAggregateInputType = {
    id?: true
    mealId?: true
    foodName?: true
    quantity?: true
    unit?: true
    weightG?: true
    calories?: true
    proteinG?: true
    carbsG?: true
    fatG?: true
    nutritionApi?: true
    apiRefId?: true
    apiResponseSnapshot?: true
    resolutionConfidence?: true
    notes?: true
    _all?: true
  }

  export type MealItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealItem to aggregate.
     */
    where?: MealItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealItems to fetch.
     */
    orderBy?: MealItemOrderByWithRelationInput | MealItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MealItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MealItems
    **/
    _count?: true | MealItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MealItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MealItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MealItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MealItemMaxAggregateInputType
  }

  export type GetMealItemAggregateType<T extends MealItemAggregateArgs> = {
        [P in keyof T & keyof AggregateMealItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMealItem[P]>
      : GetScalarType<T[P], AggregateMealItem[P]>
  }




  export type MealItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealItemWhereInput
    orderBy?: MealItemOrderByWithAggregationInput | MealItemOrderByWithAggregationInput[]
    by: MealItemScalarFieldEnum[] | MealItemScalarFieldEnum
    having?: MealItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MealItemCountAggregateInputType | true
    _avg?: MealItemAvgAggregateInputType
    _sum?: MealItemSumAggregateInputType
    _min?: MealItemMinAggregateInputType
    _max?: MealItemMaxAggregateInputType
  }

  export type MealItemGroupByOutputType = {
    id: string
    mealId: string
    foodName: string
    quantity: number
    unit: string
    weightG: number | null
    calories: number | null
    proteinG: number | null
    carbsG: number | null
    fatG: number | null
    nutritionApi: string | null
    apiRefId: string | null
    apiResponseSnapshot: JsonValue | null
    resolutionConfidence: string | null
    notes: string | null
    _count: MealItemCountAggregateOutputType | null
    _avg: MealItemAvgAggregateOutputType | null
    _sum: MealItemSumAggregateOutputType | null
    _min: MealItemMinAggregateOutputType | null
    _max: MealItemMaxAggregateOutputType | null
  }

  type GetMealItemGroupByPayload<T extends MealItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MealItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MealItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MealItemGroupByOutputType[P]>
            : GetScalarType<T[P], MealItemGroupByOutputType[P]>
        }
      >
    >


  export type MealItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mealId?: boolean
    foodName?: boolean
    quantity?: boolean
    unit?: boolean
    weightG?: boolean
    calories?: boolean
    proteinG?: boolean
    carbsG?: boolean
    fatG?: boolean
    nutritionApi?: boolean
    apiRefId?: boolean
    apiResponseSnapshot?: boolean
    resolutionConfidence?: boolean
    notes?: boolean
    meal?: boolean | MealDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mealItem"]>

  export type MealItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mealId?: boolean
    foodName?: boolean
    quantity?: boolean
    unit?: boolean
    weightG?: boolean
    calories?: boolean
    proteinG?: boolean
    carbsG?: boolean
    fatG?: boolean
    nutritionApi?: boolean
    apiRefId?: boolean
    apiResponseSnapshot?: boolean
    resolutionConfidence?: boolean
    notes?: boolean
    meal?: boolean | MealDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mealItem"]>

  export type MealItemSelectScalar = {
    id?: boolean
    mealId?: boolean
    foodName?: boolean
    quantity?: boolean
    unit?: boolean
    weightG?: boolean
    calories?: boolean
    proteinG?: boolean
    carbsG?: boolean
    fatG?: boolean
    nutritionApi?: boolean
    apiRefId?: boolean
    apiResponseSnapshot?: boolean
    resolutionConfidence?: boolean
    notes?: boolean
  }

  export type MealItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meal?: boolean | MealDefaultArgs<ExtArgs>
  }
  export type MealItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meal?: boolean | MealDefaultArgs<ExtArgs>
  }

  export type $MealItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MealItem"
    objects: {
      meal: Prisma.$MealPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mealId: string
      foodName: string
      quantity: number
      unit: string
      weightG: number | null
      calories: number | null
      proteinG: number | null
      carbsG: number | null
      fatG: number | null
      nutritionApi: string | null
      apiRefId: string | null
      apiResponseSnapshot: Prisma.JsonValue | null
      resolutionConfidence: string | null
      notes: string | null
    }, ExtArgs["result"]["mealItem"]>
    composites: {}
  }

  type MealItemGetPayload<S extends boolean | null | undefined | MealItemDefaultArgs> = $Result.GetResult<Prisma.$MealItemPayload, S>

  type MealItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MealItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MealItemCountAggregateInputType | true
    }

  export interface MealItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MealItem'], meta: { name: 'MealItem' } }
    /**
     * Find zero or one MealItem that matches the filter.
     * @param {MealItemFindUniqueArgs} args - Arguments to find a MealItem
     * @example
     * // Get one MealItem
     * const mealItem = await prisma.mealItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MealItemFindUniqueArgs>(args: SelectSubset<T, MealItemFindUniqueArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MealItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MealItemFindUniqueOrThrowArgs} args - Arguments to find a MealItem
     * @example
     * // Get one MealItem
     * const mealItem = await prisma.mealItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MealItemFindUniqueOrThrowArgs>(args: SelectSubset<T, MealItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MealItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemFindFirstArgs} args - Arguments to find a MealItem
     * @example
     * // Get one MealItem
     * const mealItem = await prisma.mealItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MealItemFindFirstArgs>(args?: SelectSubset<T, MealItemFindFirstArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MealItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemFindFirstOrThrowArgs} args - Arguments to find a MealItem
     * @example
     * // Get one MealItem
     * const mealItem = await prisma.mealItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MealItemFindFirstOrThrowArgs>(args?: SelectSubset<T, MealItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MealItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MealItems
     * const mealItems = await prisma.mealItem.findMany()
     * 
     * // Get first 10 MealItems
     * const mealItems = await prisma.mealItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mealItemWithIdOnly = await prisma.mealItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MealItemFindManyArgs>(args?: SelectSubset<T, MealItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MealItem.
     * @param {MealItemCreateArgs} args - Arguments to create a MealItem.
     * @example
     * // Create one MealItem
     * const MealItem = await prisma.mealItem.create({
     *   data: {
     *     // ... data to create a MealItem
     *   }
     * })
     * 
     */
    create<T extends MealItemCreateArgs>(args: SelectSubset<T, MealItemCreateArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MealItems.
     * @param {MealItemCreateManyArgs} args - Arguments to create many MealItems.
     * @example
     * // Create many MealItems
     * const mealItem = await prisma.mealItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MealItemCreateManyArgs>(args?: SelectSubset<T, MealItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MealItems and returns the data saved in the database.
     * @param {MealItemCreateManyAndReturnArgs} args - Arguments to create many MealItems.
     * @example
     * // Create many MealItems
     * const mealItem = await prisma.mealItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MealItems and only return the `id`
     * const mealItemWithIdOnly = await prisma.mealItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MealItemCreateManyAndReturnArgs>(args?: SelectSubset<T, MealItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MealItem.
     * @param {MealItemDeleteArgs} args - Arguments to delete one MealItem.
     * @example
     * // Delete one MealItem
     * const MealItem = await prisma.mealItem.delete({
     *   where: {
     *     // ... filter to delete one MealItem
     *   }
     * })
     * 
     */
    delete<T extends MealItemDeleteArgs>(args: SelectSubset<T, MealItemDeleteArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MealItem.
     * @param {MealItemUpdateArgs} args - Arguments to update one MealItem.
     * @example
     * // Update one MealItem
     * const mealItem = await prisma.mealItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MealItemUpdateArgs>(args: SelectSubset<T, MealItemUpdateArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MealItems.
     * @param {MealItemDeleteManyArgs} args - Arguments to filter MealItems to delete.
     * @example
     * // Delete a few MealItems
     * const { count } = await prisma.mealItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MealItemDeleteManyArgs>(args?: SelectSubset<T, MealItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MealItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MealItems
     * const mealItem = await prisma.mealItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MealItemUpdateManyArgs>(args: SelectSubset<T, MealItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MealItem.
     * @param {MealItemUpsertArgs} args - Arguments to update or create a MealItem.
     * @example
     * // Update or create a MealItem
     * const mealItem = await prisma.mealItem.upsert({
     *   create: {
     *     // ... data to create a MealItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MealItem we want to update
     *   }
     * })
     */
    upsert<T extends MealItemUpsertArgs>(args: SelectSubset<T, MealItemUpsertArgs<ExtArgs>>): Prisma__MealItemClient<$Result.GetResult<Prisma.$MealItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MealItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemCountArgs} args - Arguments to filter MealItems to count.
     * @example
     * // Count the number of MealItems
     * const count = await prisma.mealItem.count({
     *   where: {
     *     // ... the filter for the MealItems we want to count
     *   }
     * })
    **/
    count<T extends MealItemCountArgs>(
      args?: Subset<T, MealItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MealItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MealItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MealItemAggregateArgs>(args: Subset<T, MealItemAggregateArgs>): Prisma.PrismaPromise<GetMealItemAggregateType<T>>

    /**
     * Group by MealItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealItemGroupByArgs} args - Group by arguments.
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
      T extends MealItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MealItemGroupByArgs['orderBy'] }
        : { orderBy?: MealItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MealItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMealItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MealItem model
   */
  readonly fields: MealItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MealItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MealItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meal<T extends MealDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MealDefaultArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the MealItem model
   */ 
  interface MealItemFieldRefs {
    readonly id: FieldRef<"MealItem", 'String'>
    readonly mealId: FieldRef<"MealItem", 'String'>
    readonly foodName: FieldRef<"MealItem", 'String'>
    readonly quantity: FieldRef<"MealItem", 'Float'>
    readonly unit: FieldRef<"MealItem", 'String'>
    readonly weightG: FieldRef<"MealItem", 'Float'>
    readonly calories: FieldRef<"MealItem", 'Int'>
    readonly proteinG: FieldRef<"MealItem", 'Float'>
    readonly carbsG: FieldRef<"MealItem", 'Float'>
    readonly fatG: FieldRef<"MealItem", 'Float'>
    readonly nutritionApi: FieldRef<"MealItem", 'String'>
    readonly apiRefId: FieldRef<"MealItem", 'String'>
    readonly apiResponseSnapshot: FieldRef<"MealItem", 'Json'>
    readonly resolutionConfidence: FieldRef<"MealItem", 'String'>
    readonly notes: FieldRef<"MealItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MealItem findUnique
   */
  export type MealItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * Filter, which MealItem to fetch.
     */
    where: MealItemWhereUniqueInput
  }

  /**
   * MealItem findUniqueOrThrow
   */
  export type MealItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * Filter, which MealItem to fetch.
     */
    where: MealItemWhereUniqueInput
  }

  /**
   * MealItem findFirst
   */
  export type MealItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * Filter, which MealItem to fetch.
     */
    where?: MealItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealItems to fetch.
     */
    orderBy?: MealItemOrderByWithRelationInput | MealItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealItems.
     */
    cursor?: MealItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealItems.
     */
    distinct?: MealItemScalarFieldEnum | MealItemScalarFieldEnum[]
  }

  /**
   * MealItem findFirstOrThrow
   */
  export type MealItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * Filter, which MealItem to fetch.
     */
    where?: MealItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealItems to fetch.
     */
    orderBy?: MealItemOrderByWithRelationInput | MealItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealItems.
     */
    cursor?: MealItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealItems.
     */
    distinct?: MealItemScalarFieldEnum | MealItemScalarFieldEnum[]
  }

  /**
   * MealItem findMany
   */
  export type MealItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * Filter, which MealItems to fetch.
     */
    where?: MealItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealItems to fetch.
     */
    orderBy?: MealItemOrderByWithRelationInput | MealItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MealItems.
     */
    cursor?: MealItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealItems.
     */
    skip?: number
    distinct?: MealItemScalarFieldEnum | MealItemScalarFieldEnum[]
  }

  /**
   * MealItem create
   */
  export type MealItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * The data needed to create a MealItem.
     */
    data: XOR<MealItemCreateInput, MealItemUncheckedCreateInput>
  }

  /**
   * MealItem createMany
   */
  export type MealItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MealItems.
     */
    data: MealItemCreateManyInput | MealItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MealItem createManyAndReturn
   */
  export type MealItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MealItems.
     */
    data: MealItemCreateManyInput | MealItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MealItem update
   */
  export type MealItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * The data needed to update a MealItem.
     */
    data: XOR<MealItemUpdateInput, MealItemUncheckedUpdateInput>
    /**
     * Choose, which MealItem to update.
     */
    where: MealItemWhereUniqueInput
  }

  /**
   * MealItem updateMany
   */
  export type MealItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MealItems.
     */
    data: XOR<MealItemUpdateManyMutationInput, MealItemUncheckedUpdateManyInput>
    /**
     * Filter which MealItems to update
     */
    where?: MealItemWhereInput
  }

  /**
   * MealItem upsert
   */
  export type MealItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * The filter to search for the MealItem to update in case it exists.
     */
    where: MealItemWhereUniqueInput
    /**
     * In case the MealItem found by the `where` argument doesn't exist, create a new MealItem with this data.
     */
    create: XOR<MealItemCreateInput, MealItemUncheckedCreateInput>
    /**
     * In case the MealItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MealItemUpdateInput, MealItemUncheckedUpdateInput>
  }

  /**
   * MealItem delete
   */
  export type MealItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
    /**
     * Filter which MealItem to delete.
     */
    where: MealItemWhereUniqueInput
  }

  /**
   * MealItem deleteMany
   */
  export type MealItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealItems to delete
     */
    where?: MealItemWhereInput
  }

  /**
   * MealItem without action
   */
  export type MealItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealItem
     */
    select?: MealItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealItemInclude<ExtArgs> | null
  }


  /**
   * Model ApiCache
   */

  export type AggregateApiCache = {
    _count: ApiCacheCountAggregateOutputType | null
    _min: ApiCacheMinAggregateOutputType | null
    _max: ApiCacheMaxAggregateOutputType | null
  }

  export type ApiCacheMinAggregateOutputType = {
    id: string | null
    vendor: string | null
    queryString: string | null
    normalizedQueryHash: string | null
    fetchedAt: Date | null
    expiresAt: Date | null
  }

  export type ApiCacheMaxAggregateOutputType = {
    id: string | null
    vendor: string | null
    queryString: string | null
    normalizedQueryHash: string | null
    fetchedAt: Date | null
    expiresAt: Date | null
  }

  export type ApiCacheCountAggregateOutputType = {
    id: number
    vendor: number
    queryString: number
    normalizedQueryHash: number
    nutritionData: number
    fetchedAt: number
    expiresAt: number
    _all: number
  }


  export type ApiCacheMinAggregateInputType = {
    id?: true
    vendor?: true
    queryString?: true
    normalizedQueryHash?: true
    fetchedAt?: true
    expiresAt?: true
  }

  export type ApiCacheMaxAggregateInputType = {
    id?: true
    vendor?: true
    queryString?: true
    normalizedQueryHash?: true
    fetchedAt?: true
    expiresAt?: true
  }

  export type ApiCacheCountAggregateInputType = {
    id?: true
    vendor?: true
    queryString?: true
    normalizedQueryHash?: true
    nutritionData?: true
    fetchedAt?: true
    expiresAt?: true
    _all?: true
  }

  export type ApiCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiCache to aggregate.
     */
    where?: ApiCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiCaches to fetch.
     */
    orderBy?: ApiCacheOrderByWithRelationInput | ApiCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiCaches
    **/
    _count?: true | ApiCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiCacheMaxAggregateInputType
  }

  export type GetApiCacheAggregateType<T extends ApiCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateApiCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiCache[P]>
      : GetScalarType<T[P], AggregateApiCache[P]>
  }




  export type ApiCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiCacheWhereInput
    orderBy?: ApiCacheOrderByWithAggregationInput | ApiCacheOrderByWithAggregationInput[]
    by: ApiCacheScalarFieldEnum[] | ApiCacheScalarFieldEnum
    having?: ApiCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiCacheCountAggregateInputType | true
    _min?: ApiCacheMinAggregateInputType
    _max?: ApiCacheMaxAggregateInputType
  }

  export type ApiCacheGroupByOutputType = {
    id: string
    vendor: string
    queryString: string
    normalizedQueryHash: string
    nutritionData: JsonValue
    fetchedAt: Date
    expiresAt: Date
    _count: ApiCacheCountAggregateOutputType | null
    _min: ApiCacheMinAggregateOutputType | null
    _max: ApiCacheMaxAggregateOutputType | null
  }

  type GetApiCacheGroupByPayload<T extends ApiCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiCacheGroupByOutputType[P]>
            : GetScalarType<T[P], ApiCacheGroupByOutputType[P]>
        }
      >
    >


  export type ApiCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendor?: boolean
    queryString?: boolean
    normalizedQueryHash?: boolean
    nutritionData?: boolean
    fetchedAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["apiCache"]>

  export type ApiCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendor?: boolean
    queryString?: boolean
    normalizedQueryHash?: boolean
    nutritionData?: boolean
    fetchedAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["apiCache"]>

  export type ApiCacheSelectScalar = {
    id?: boolean
    vendor?: boolean
    queryString?: boolean
    normalizedQueryHash?: boolean
    nutritionData?: boolean
    fetchedAt?: boolean
    expiresAt?: boolean
  }


  export type $ApiCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vendor: string
      queryString: string
      normalizedQueryHash: string
      nutritionData: Prisma.JsonValue
      fetchedAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["apiCache"]>
    composites: {}
  }

  type ApiCacheGetPayload<S extends boolean | null | undefined | ApiCacheDefaultArgs> = $Result.GetResult<Prisma.$ApiCachePayload, S>

  type ApiCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ApiCacheFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ApiCacheCountAggregateInputType | true
    }

  export interface ApiCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiCache'], meta: { name: 'ApiCache' } }
    /**
     * Find zero or one ApiCache that matches the filter.
     * @param {ApiCacheFindUniqueArgs} args - Arguments to find a ApiCache
     * @example
     * // Get one ApiCache
     * const apiCache = await prisma.apiCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiCacheFindUniqueArgs>(args: SelectSubset<T, ApiCacheFindUniqueArgs<ExtArgs>>): Prisma__ApiCacheClient<$Result.GetResult<Prisma.$ApiCachePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ApiCache that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ApiCacheFindUniqueOrThrowArgs} args - Arguments to find a ApiCache
     * @example
     * // Get one ApiCache
     * const apiCache = await prisma.apiCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiCacheClient<$Result.GetResult<Prisma.$ApiCachePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ApiCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiCacheFindFirstArgs} args - Arguments to find a ApiCache
     * @example
     * // Get one ApiCache
     * const apiCache = await prisma.apiCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiCacheFindFirstArgs>(args?: SelectSubset<T, ApiCacheFindFirstArgs<ExtArgs>>): Prisma__ApiCacheClient<$Result.GetResult<Prisma.$ApiCachePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ApiCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiCacheFindFirstOrThrowArgs} args - Arguments to find a ApiCache
     * @example
     * // Get one ApiCache
     * const apiCache = await prisma.apiCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiCacheClient<$Result.GetResult<Prisma.$ApiCachePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ApiCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiCaches
     * const apiCaches = await prisma.apiCache.findMany()
     * 
     * // Get first 10 ApiCaches
     * const apiCaches = await prisma.apiCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiCacheWithIdOnly = await prisma.apiCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiCacheFindManyArgs>(args?: SelectSubset<T, ApiCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiCachePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ApiCache.
     * @param {ApiCacheCreateArgs} args - Arguments to create a ApiCache.
     * @example
     * // Create one ApiCache
     * const ApiCache = await prisma.apiCache.create({
     *   data: {
     *     // ... data to create a ApiCache
     *   }
     * })
     * 
     */
    create<T extends ApiCacheCreateArgs>(args: SelectSubset<T, ApiCacheCreateArgs<ExtArgs>>): Prisma__ApiCacheClient<$Result.GetResult<Prisma.$ApiCachePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ApiCaches.
     * @param {ApiCacheCreateManyArgs} args - Arguments to create many ApiCaches.
     * @example
     * // Create many ApiCaches
     * const apiCache = await prisma.apiCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiCacheCreateManyArgs>(args?: SelectSubset<T, ApiCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiCaches and returns the data saved in the database.
     * @param {ApiCacheCreateManyAndReturnArgs} args - Arguments to create many ApiCaches.
     * @example
     * // Create many ApiCaches
     * const apiCache = await prisma.apiCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiCaches and only return the `id`
     * const apiCacheWithIdOnly = await prisma.apiCache.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiCachePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ApiCache.
     * @param {ApiCacheDeleteArgs} args - Arguments to delete one ApiCache.
     * @example
     * // Delete one ApiCache
     * const ApiCache = await prisma.apiCache.delete({
     *   where: {
     *     // ... filter to delete one ApiCache
     *   }
     * })
     * 
     */
    delete<T extends ApiCacheDeleteArgs>(args: SelectSubset<T, ApiCacheDeleteArgs<ExtArgs>>): Prisma__ApiCacheClient<$Result.GetResult<Prisma.$ApiCachePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ApiCache.
     * @param {ApiCacheUpdateArgs} args - Arguments to update one ApiCache.
     * @example
     * // Update one ApiCache
     * const apiCache = await prisma.apiCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiCacheUpdateArgs>(args: SelectSubset<T, ApiCacheUpdateArgs<ExtArgs>>): Prisma__ApiCacheClient<$Result.GetResult<Prisma.$ApiCachePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ApiCaches.
     * @param {ApiCacheDeleteManyArgs} args - Arguments to filter ApiCaches to delete.
     * @example
     * // Delete a few ApiCaches
     * const { count } = await prisma.apiCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiCacheDeleteManyArgs>(args?: SelectSubset<T, ApiCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiCaches
     * const apiCache = await prisma.apiCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiCacheUpdateManyArgs>(args: SelectSubset<T, ApiCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ApiCache.
     * @param {ApiCacheUpsertArgs} args - Arguments to update or create a ApiCache.
     * @example
     * // Update or create a ApiCache
     * const apiCache = await prisma.apiCache.upsert({
     *   create: {
     *     // ... data to create a ApiCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiCache we want to update
     *   }
     * })
     */
    upsert<T extends ApiCacheUpsertArgs>(args: SelectSubset<T, ApiCacheUpsertArgs<ExtArgs>>): Prisma__ApiCacheClient<$Result.GetResult<Prisma.$ApiCachePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ApiCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiCacheCountArgs} args - Arguments to filter ApiCaches to count.
     * @example
     * // Count the number of ApiCaches
     * const count = await prisma.apiCache.count({
     *   where: {
     *     // ... the filter for the ApiCaches we want to count
     *   }
     * })
    **/
    count<T extends ApiCacheCountArgs>(
      args?: Subset<T, ApiCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApiCacheAggregateArgs>(args: Subset<T, ApiCacheAggregateArgs>): Prisma.PrismaPromise<GetApiCacheAggregateType<T>>

    /**
     * Group by ApiCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiCacheGroupByArgs} args - Group by arguments.
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
      T extends ApiCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiCacheGroupByArgs['orderBy'] }
        : { orderBy?: ApiCacheGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApiCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiCache model
   */
  readonly fields: ApiCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ApiCache model
   */ 
  interface ApiCacheFieldRefs {
    readonly id: FieldRef<"ApiCache", 'String'>
    readonly vendor: FieldRef<"ApiCache", 'String'>
    readonly queryString: FieldRef<"ApiCache", 'String'>
    readonly normalizedQueryHash: FieldRef<"ApiCache", 'String'>
    readonly nutritionData: FieldRef<"ApiCache", 'Json'>
    readonly fetchedAt: FieldRef<"ApiCache", 'DateTime'>
    readonly expiresAt: FieldRef<"ApiCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiCache findUnique
   */
  export type ApiCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiCache
     */
    select?: ApiCacheSelect<ExtArgs> | null
    /**
     * Filter, which ApiCache to fetch.
     */
    where: ApiCacheWhereUniqueInput
  }

  /**
   * ApiCache findUniqueOrThrow
   */
  export type ApiCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiCache
     */
    select?: ApiCacheSelect<ExtArgs> | null
    /**
     * Filter, which ApiCache to fetch.
     */
    where: ApiCacheWhereUniqueInput
  }

  /**
   * ApiCache findFirst
   */
  export type ApiCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiCache
     */
    select?: ApiCacheSelect<ExtArgs> | null
    /**
     * Filter, which ApiCache to fetch.
     */
    where?: ApiCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiCaches to fetch.
     */
    orderBy?: ApiCacheOrderByWithRelationInput | ApiCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiCaches.
     */
    cursor?: ApiCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiCaches.
     */
    distinct?: ApiCacheScalarFieldEnum | ApiCacheScalarFieldEnum[]
  }

  /**
   * ApiCache findFirstOrThrow
   */
  export type ApiCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiCache
     */
    select?: ApiCacheSelect<ExtArgs> | null
    /**
     * Filter, which ApiCache to fetch.
     */
    where?: ApiCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiCaches to fetch.
     */
    orderBy?: ApiCacheOrderByWithRelationInput | ApiCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiCaches.
     */
    cursor?: ApiCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiCaches.
     */
    distinct?: ApiCacheScalarFieldEnum | ApiCacheScalarFieldEnum[]
  }

  /**
   * ApiCache findMany
   */
  export type ApiCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiCache
     */
    select?: ApiCacheSelect<ExtArgs> | null
    /**
     * Filter, which ApiCaches to fetch.
     */
    where?: ApiCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiCaches to fetch.
     */
    orderBy?: ApiCacheOrderByWithRelationInput | ApiCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiCaches.
     */
    cursor?: ApiCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiCaches.
     */
    skip?: number
    distinct?: ApiCacheScalarFieldEnum | ApiCacheScalarFieldEnum[]
  }

  /**
   * ApiCache create
   */
  export type ApiCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiCache
     */
    select?: ApiCacheSelect<ExtArgs> | null
    /**
     * The data needed to create a ApiCache.
     */
    data: XOR<ApiCacheCreateInput, ApiCacheUncheckedCreateInput>
  }

  /**
   * ApiCache createMany
   */
  export type ApiCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiCaches.
     */
    data: ApiCacheCreateManyInput | ApiCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiCache createManyAndReturn
   */
  export type ApiCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiCache
     */
    select?: ApiCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ApiCaches.
     */
    data: ApiCacheCreateManyInput | ApiCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiCache update
   */
  export type ApiCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiCache
     */
    select?: ApiCacheSelect<ExtArgs> | null
    /**
     * The data needed to update a ApiCache.
     */
    data: XOR<ApiCacheUpdateInput, ApiCacheUncheckedUpdateInput>
    /**
     * Choose, which ApiCache to update.
     */
    where: ApiCacheWhereUniqueInput
  }

  /**
   * ApiCache updateMany
   */
  export type ApiCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiCaches.
     */
    data: XOR<ApiCacheUpdateManyMutationInput, ApiCacheUncheckedUpdateManyInput>
    /**
     * Filter which ApiCaches to update
     */
    where?: ApiCacheWhereInput
  }

  /**
   * ApiCache upsert
   */
  export type ApiCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiCache
     */
    select?: ApiCacheSelect<ExtArgs> | null
    /**
     * The filter to search for the ApiCache to update in case it exists.
     */
    where: ApiCacheWhereUniqueInput
    /**
     * In case the ApiCache found by the `where` argument doesn't exist, create a new ApiCache with this data.
     */
    create: XOR<ApiCacheCreateInput, ApiCacheUncheckedCreateInput>
    /**
     * In case the ApiCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiCacheUpdateInput, ApiCacheUncheckedUpdateInput>
  }

  /**
   * ApiCache delete
   */
  export type ApiCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiCache
     */
    select?: ApiCacheSelect<ExtArgs> | null
    /**
     * Filter which ApiCache to delete.
     */
    where: ApiCacheWhereUniqueInput
  }

  /**
   * ApiCache deleteMany
   */
  export type ApiCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiCaches to delete
     */
    where?: ApiCacheWhereInput
  }

  /**
   * ApiCache without action
   */
  export type ApiCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiCache
     */
    select?: ApiCacheSelect<ExtArgs> | null
  }


  /**
   * Model UserWeightHistory
   */

  export type AggregateUserWeightHistory = {
    _count: UserWeightHistoryCountAggregateOutputType | null
    _avg: UserWeightHistoryAvgAggregateOutputType | null
    _sum: UserWeightHistorySumAggregateOutputType | null
    _min: UserWeightHistoryMinAggregateOutputType | null
    _max: UserWeightHistoryMaxAggregateOutputType | null
  }

  export type UserWeightHistoryAvgAggregateOutputType = {
    weightKg: number | null
  }

  export type UserWeightHistorySumAggregateOutputType = {
    weightKg: number | null
  }

  export type UserWeightHistoryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    weightKg: number | null
    recordedAt: Date | null
    source: string | null
  }

  export type UserWeightHistoryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    weightKg: number | null
    recordedAt: Date | null
    source: string | null
  }

  export type UserWeightHistoryCountAggregateOutputType = {
    id: number
    userId: number
    weightKg: number
    recordedAt: number
    source: number
    _all: number
  }


  export type UserWeightHistoryAvgAggregateInputType = {
    weightKg?: true
  }

  export type UserWeightHistorySumAggregateInputType = {
    weightKg?: true
  }

  export type UserWeightHistoryMinAggregateInputType = {
    id?: true
    userId?: true
    weightKg?: true
    recordedAt?: true
    source?: true
  }

  export type UserWeightHistoryMaxAggregateInputType = {
    id?: true
    userId?: true
    weightKg?: true
    recordedAt?: true
    source?: true
  }

  export type UserWeightHistoryCountAggregateInputType = {
    id?: true
    userId?: true
    weightKg?: true
    recordedAt?: true
    source?: true
    _all?: true
  }

  export type UserWeightHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWeightHistory to aggregate.
     */
    where?: UserWeightHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWeightHistories to fetch.
     */
    orderBy?: UserWeightHistoryOrderByWithRelationInput | UserWeightHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWeightHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWeightHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWeightHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserWeightHistories
    **/
    _count?: true | UserWeightHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserWeightHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserWeightHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserWeightHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserWeightHistoryMaxAggregateInputType
  }

  export type GetUserWeightHistoryAggregateType<T extends UserWeightHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateUserWeightHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserWeightHistory[P]>
      : GetScalarType<T[P], AggregateUserWeightHistory[P]>
  }




  export type UserWeightHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWeightHistoryWhereInput
    orderBy?: UserWeightHistoryOrderByWithAggregationInput | UserWeightHistoryOrderByWithAggregationInput[]
    by: UserWeightHistoryScalarFieldEnum[] | UserWeightHistoryScalarFieldEnum
    having?: UserWeightHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserWeightHistoryCountAggregateInputType | true
    _avg?: UserWeightHistoryAvgAggregateInputType
    _sum?: UserWeightHistorySumAggregateInputType
    _min?: UserWeightHistoryMinAggregateInputType
    _max?: UserWeightHistoryMaxAggregateInputType
  }

  export type UserWeightHistoryGroupByOutputType = {
    id: string
    userId: string
    weightKg: number
    recordedAt: Date
    source: string | null
    _count: UserWeightHistoryCountAggregateOutputType | null
    _avg: UserWeightHistoryAvgAggregateOutputType | null
    _sum: UserWeightHistorySumAggregateOutputType | null
    _min: UserWeightHistoryMinAggregateOutputType | null
    _max: UserWeightHistoryMaxAggregateOutputType | null
  }

  type GetUserWeightHistoryGroupByPayload<T extends UserWeightHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserWeightHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserWeightHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserWeightHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], UserWeightHistoryGroupByOutputType[P]>
        }
      >
    >


  export type UserWeightHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    weightKg?: boolean
    recordedAt?: boolean
    source?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWeightHistory"]>

  export type UserWeightHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    weightKg?: boolean
    recordedAt?: boolean
    source?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWeightHistory"]>

  export type UserWeightHistorySelectScalar = {
    id?: boolean
    userId?: boolean
    weightKg?: boolean
    recordedAt?: boolean
    source?: boolean
  }

  export type UserWeightHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserWeightHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserWeightHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserWeightHistory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      weightKg: number
      recordedAt: Date
      source: string | null
    }, ExtArgs["result"]["userWeightHistory"]>
    composites: {}
  }

  type UserWeightHistoryGetPayload<S extends boolean | null | undefined | UserWeightHistoryDefaultArgs> = $Result.GetResult<Prisma.$UserWeightHistoryPayload, S>

  type UserWeightHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserWeightHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserWeightHistoryCountAggregateInputType | true
    }

  export interface UserWeightHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserWeightHistory'], meta: { name: 'UserWeightHistory' } }
    /**
     * Find zero or one UserWeightHistory that matches the filter.
     * @param {UserWeightHistoryFindUniqueArgs} args - Arguments to find a UserWeightHistory
     * @example
     * // Get one UserWeightHistory
     * const userWeightHistory = await prisma.userWeightHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserWeightHistoryFindUniqueArgs>(args: SelectSubset<T, UserWeightHistoryFindUniqueArgs<ExtArgs>>): Prisma__UserWeightHistoryClient<$Result.GetResult<Prisma.$UserWeightHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserWeightHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserWeightHistoryFindUniqueOrThrowArgs} args - Arguments to find a UserWeightHistory
     * @example
     * // Get one UserWeightHistory
     * const userWeightHistory = await prisma.userWeightHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserWeightHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, UserWeightHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserWeightHistoryClient<$Result.GetResult<Prisma.$UserWeightHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserWeightHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWeightHistoryFindFirstArgs} args - Arguments to find a UserWeightHistory
     * @example
     * // Get one UserWeightHistory
     * const userWeightHistory = await prisma.userWeightHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserWeightHistoryFindFirstArgs>(args?: SelectSubset<T, UserWeightHistoryFindFirstArgs<ExtArgs>>): Prisma__UserWeightHistoryClient<$Result.GetResult<Prisma.$UserWeightHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserWeightHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWeightHistoryFindFirstOrThrowArgs} args - Arguments to find a UserWeightHistory
     * @example
     * // Get one UserWeightHistory
     * const userWeightHistory = await prisma.userWeightHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserWeightHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, UserWeightHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserWeightHistoryClient<$Result.GetResult<Prisma.$UserWeightHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserWeightHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWeightHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserWeightHistories
     * const userWeightHistories = await prisma.userWeightHistory.findMany()
     * 
     * // Get first 10 UserWeightHistories
     * const userWeightHistories = await prisma.userWeightHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWeightHistoryWithIdOnly = await prisma.userWeightHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserWeightHistoryFindManyArgs>(args?: SelectSubset<T, UserWeightHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWeightHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserWeightHistory.
     * @param {UserWeightHistoryCreateArgs} args - Arguments to create a UserWeightHistory.
     * @example
     * // Create one UserWeightHistory
     * const UserWeightHistory = await prisma.userWeightHistory.create({
     *   data: {
     *     // ... data to create a UserWeightHistory
     *   }
     * })
     * 
     */
    create<T extends UserWeightHistoryCreateArgs>(args: SelectSubset<T, UserWeightHistoryCreateArgs<ExtArgs>>): Prisma__UserWeightHistoryClient<$Result.GetResult<Prisma.$UserWeightHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserWeightHistories.
     * @param {UserWeightHistoryCreateManyArgs} args - Arguments to create many UserWeightHistories.
     * @example
     * // Create many UserWeightHistories
     * const userWeightHistory = await prisma.userWeightHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserWeightHistoryCreateManyArgs>(args?: SelectSubset<T, UserWeightHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserWeightHistories and returns the data saved in the database.
     * @param {UserWeightHistoryCreateManyAndReturnArgs} args - Arguments to create many UserWeightHistories.
     * @example
     * // Create many UserWeightHistories
     * const userWeightHistory = await prisma.userWeightHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserWeightHistories and only return the `id`
     * const userWeightHistoryWithIdOnly = await prisma.userWeightHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserWeightHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, UserWeightHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWeightHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserWeightHistory.
     * @param {UserWeightHistoryDeleteArgs} args - Arguments to delete one UserWeightHistory.
     * @example
     * // Delete one UserWeightHistory
     * const UserWeightHistory = await prisma.userWeightHistory.delete({
     *   where: {
     *     // ... filter to delete one UserWeightHistory
     *   }
     * })
     * 
     */
    delete<T extends UserWeightHistoryDeleteArgs>(args: SelectSubset<T, UserWeightHistoryDeleteArgs<ExtArgs>>): Prisma__UserWeightHistoryClient<$Result.GetResult<Prisma.$UserWeightHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserWeightHistory.
     * @param {UserWeightHistoryUpdateArgs} args - Arguments to update one UserWeightHistory.
     * @example
     * // Update one UserWeightHistory
     * const userWeightHistory = await prisma.userWeightHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserWeightHistoryUpdateArgs>(args: SelectSubset<T, UserWeightHistoryUpdateArgs<ExtArgs>>): Prisma__UserWeightHistoryClient<$Result.GetResult<Prisma.$UserWeightHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserWeightHistories.
     * @param {UserWeightHistoryDeleteManyArgs} args - Arguments to filter UserWeightHistories to delete.
     * @example
     * // Delete a few UserWeightHistories
     * const { count } = await prisma.userWeightHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserWeightHistoryDeleteManyArgs>(args?: SelectSubset<T, UserWeightHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserWeightHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWeightHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserWeightHistories
     * const userWeightHistory = await prisma.userWeightHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserWeightHistoryUpdateManyArgs>(args: SelectSubset<T, UserWeightHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserWeightHistory.
     * @param {UserWeightHistoryUpsertArgs} args - Arguments to update or create a UserWeightHistory.
     * @example
     * // Update or create a UserWeightHistory
     * const userWeightHistory = await prisma.userWeightHistory.upsert({
     *   create: {
     *     // ... data to create a UserWeightHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserWeightHistory we want to update
     *   }
     * })
     */
    upsert<T extends UserWeightHistoryUpsertArgs>(args: SelectSubset<T, UserWeightHistoryUpsertArgs<ExtArgs>>): Prisma__UserWeightHistoryClient<$Result.GetResult<Prisma.$UserWeightHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserWeightHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWeightHistoryCountArgs} args - Arguments to filter UserWeightHistories to count.
     * @example
     * // Count the number of UserWeightHistories
     * const count = await prisma.userWeightHistory.count({
     *   where: {
     *     // ... the filter for the UserWeightHistories we want to count
     *   }
     * })
    **/
    count<T extends UserWeightHistoryCountArgs>(
      args?: Subset<T, UserWeightHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserWeightHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserWeightHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWeightHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserWeightHistoryAggregateArgs>(args: Subset<T, UserWeightHistoryAggregateArgs>): Prisma.PrismaPromise<GetUserWeightHistoryAggregateType<T>>

    /**
     * Group by UserWeightHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWeightHistoryGroupByArgs} args - Group by arguments.
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
      T extends UserWeightHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserWeightHistoryGroupByArgs['orderBy'] }
        : { orderBy?: UserWeightHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserWeightHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserWeightHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserWeightHistory model
   */
  readonly fields: UserWeightHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserWeightHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserWeightHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the UserWeightHistory model
   */ 
  interface UserWeightHistoryFieldRefs {
    readonly id: FieldRef<"UserWeightHistory", 'String'>
    readonly userId: FieldRef<"UserWeightHistory", 'String'>
    readonly weightKg: FieldRef<"UserWeightHistory", 'Float'>
    readonly recordedAt: FieldRef<"UserWeightHistory", 'DateTime'>
    readonly source: FieldRef<"UserWeightHistory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserWeightHistory findUnique
   */
  export type UserWeightHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWeightHistory
     */
    select?: UserWeightHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWeightHistoryInclude<ExtArgs> | null
    /**
     * Filter, which UserWeightHistory to fetch.
     */
    where: UserWeightHistoryWhereUniqueInput
  }

  /**
   * UserWeightHistory findUniqueOrThrow
   */
  export type UserWeightHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWeightHistory
     */
    select?: UserWeightHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWeightHistoryInclude<ExtArgs> | null
    /**
     * Filter, which UserWeightHistory to fetch.
     */
    where: UserWeightHistoryWhereUniqueInput
  }

  /**
   * UserWeightHistory findFirst
   */
  export type UserWeightHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWeightHistory
     */
    select?: UserWeightHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWeightHistoryInclude<ExtArgs> | null
    /**
     * Filter, which UserWeightHistory to fetch.
     */
    where?: UserWeightHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWeightHistories to fetch.
     */
    orderBy?: UserWeightHistoryOrderByWithRelationInput | UserWeightHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWeightHistories.
     */
    cursor?: UserWeightHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWeightHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWeightHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWeightHistories.
     */
    distinct?: UserWeightHistoryScalarFieldEnum | UserWeightHistoryScalarFieldEnum[]
  }

  /**
   * UserWeightHistory findFirstOrThrow
   */
  export type UserWeightHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWeightHistory
     */
    select?: UserWeightHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWeightHistoryInclude<ExtArgs> | null
    /**
     * Filter, which UserWeightHistory to fetch.
     */
    where?: UserWeightHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWeightHistories to fetch.
     */
    orderBy?: UserWeightHistoryOrderByWithRelationInput | UserWeightHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWeightHistories.
     */
    cursor?: UserWeightHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWeightHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWeightHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWeightHistories.
     */
    distinct?: UserWeightHistoryScalarFieldEnum | UserWeightHistoryScalarFieldEnum[]
  }

  /**
   * UserWeightHistory findMany
   */
  export type UserWeightHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWeightHistory
     */
    select?: UserWeightHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWeightHistoryInclude<ExtArgs> | null
    /**
     * Filter, which UserWeightHistories to fetch.
     */
    where?: UserWeightHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWeightHistories to fetch.
     */
    orderBy?: UserWeightHistoryOrderByWithRelationInput | UserWeightHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserWeightHistories.
     */
    cursor?: UserWeightHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWeightHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWeightHistories.
     */
    skip?: number
    distinct?: UserWeightHistoryScalarFieldEnum | UserWeightHistoryScalarFieldEnum[]
  }

  /**
   * UserWeightHistory create
   */
  export type UserWeightHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWeightHistory
     */
    select?: UserWeightHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWeightHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a UserWeightHistory.
     */
    data: XOR<UserWeightHistoryCreateInput, UserWeightHistoryUncheckedCreateInput>
  }

  /**
   * UserWeightHistory createMany
   */
  export type UserWeightHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserWeightHistories.
     */
    data: UserWeightHistoryCreateManyInput | UserWeightHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserWeightHistory createManyAndReturn
   */
  export type UserWeightHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWeightHistory
     */
    select?: UserWeightHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserWeightHistories.
     */
    data: UserWeightHistoryCreateManyInput | UserWeightHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWeightHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserWeightHistory update
   */
  export type UserWeightHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWeightHistory
     */
    select?: UserWeightHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWeightHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a UserWeightHistory.
     */
    data: XOR<UserWeightHistoryUpdateInput, UserWeightHistoryUncheckedUpdateInput>
    /**
     * Choose, which UserWeightHistory to update.
     */
    where: UserWeightHistoryWhereUniqueInput
  }

  /**
   * UserWeightHistory updateMany
   */
  export type UserWeightHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserWeightHistories.
     */
    data: XOR<UserWeightHistoryUpdateManyMutationInput, UserWeightHistoryUncheckedUpdateManyInput>
    /**
     * Filter which UserWeightHistories to update
     */
    where?: UserWeightHistoryWhereInput
  }

  /**
   * UserWeightHistory upsert
   */
  export type UserWeightHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWeightHistory
     */
    select?: UserWeightHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWeightHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the UserWeightHistory to update in case it exists.
     */
    where: UserWeightHistoryWhereUniqueInput
    /**
     * In case the UserWeightHistory found by the `where` argument doesn't exist, create a new UserWeightHistory with this data.
     */
    create: XOR<UserWeightHistoryCreateInput, UserWeightHistoryUncheckedCreateInput>
    /**
     * In case the UserWeightHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserWeightHistoryUpdateInput, UserWeightHistoryUncheckedUpdateInput>
  }

  /**
   * UserWeightHistory delete
   */
  export type UserWeightHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWeightHistory
     */
    select?: UserWeightHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWeightHistoryInclude<ExtArgs> | null
    /**
     * Filter which UserWeightHistory to delete.
     */
    where: UserWeightHistoryWhereUniqueInput
  }

  /**
   * UserWeightHistory deleteMany
   */
  export type UserWeightHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWeightHistories to delete
     */
    where?: UserWeightHistoryWhereInput
  }

  /**
   * UserWeightHistory without action
   */
  export type UserWeightHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWeightHistory
     */
    select?: UserWeightHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWeightHistoryInclude<ExtArgs> | null
  }


  /**
   * Model EditHistory
   */

  export type AggregateEditHistory = {
    _count: EditHistoryCountAggregateOutputType | null
    _min: EditHistoryMinAggregateOutputType | null
    _max: EditHistoryMaxAggregateOutputType | null
  }

  export type EditHistoryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    mealId: string | null
    sourceLogId: string | null
    editType: string | null
    changedAt: Date | null
  }

  export type EditHistoryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    mealId: string | null
    sourceLogId: string | null
    editType: string | null
    changedAt: Date | null
  }

  export type EditHistoryCountAggregateOutputType = {
    id: number
    userId: number
    mealId: number
    sourceLogId: number
    editType: number
    oldValue: number
    newValue: number
    changedAt: number
    _all: number
  }


  export type EditHistoryMinAggregateInputType = {
    id?: true
    userId?: true
    mealId?: true
    sourceLogId?: true
    editType?: true
    changedAt?: true
  }

  export type EditHistoryMaxAggregateInputType = {
    id?: true
    userId?: true
    mealId?: true
    sourceLogId?: true
    editType?: true
    changedAt?: true
  }

  export type EditHistoryCountAggregateInputType = {
    id?: true
    userId?: true
    mealId?: true
    sourceLogId?: true
    editType?: true
    oldValue?: true
    newValue?: true
    changedAt?: true
    _all?: true
  }

  export type EditHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EditHistory to aggregate.
     */
    where?: EditHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EditHistories to fetch.
     */
    orderBy?: EditHistoryOrderByWithRelationInput | EditHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EditHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EditHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EditHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EditHistories
    **/
    _count?: true | EditHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EditHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EditHistoryMaxAggregateInputType
  }

  export type GetEditHistoryAggregateType<T extends EditHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateEditHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEditHistory[P]>
      : GetScalarType<T[P], AggregateEditHistory[P]>
  }




  export type EditHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EditHistoryWhereInput
    orderBy?: EditHistoryOrderByWithAggregationInput | EditHistoryOrderByWithAggregationInput[]
    by: EditHistoryScalarFieldEnum[] | EditHistoryScalarFieldEnum
    having?: EditHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EditHistoryCountAggregateInputType | true
    _min?: EditHistoryMinAggregateInputType
    _max?: EditHistoryMaxAggregateInputType
  }

  export type EditHistoryGroupByOutputType = {
    id: string
    userId: string
    mealId: string
    sourceLogId: string | null
    editType: string
    oldValue: JsonValue | null
    newValue: JsonValue | null
    changedAt: Date
    _count: EditHistoryCountAggregateOutputType | null
    _min: EditHistoryMinAggregateOutputType | null
    _max: EditHistoryMaxAggregateOutputType | null
  }

  type GetEditHistoryGroupByPayload<T extends EditHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EditHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EditHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EditHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], EditHistoryGroupByOutputType[P]>
        }
      >
    >


  export type EditHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mealId?: boolean
    sourceLogId?: boolean
    editType?: boolean
    oldValue?: boolean
    newValue?: boolean
    changedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    meal?: boolean | MealDefaultArgs<ExtArgs>
    sourceLog?: boolean | EditHistory$sourceLogArgs<ExtArgs>
  }, ExtArgs["result"]["editHistory"]>

  export type EditHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mealId?: boolean
    sourceLogId?: boolean
    editType?: boolean
    oldValue?: boolean
    newValue?: boolean
    changedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    meal?: boolean | MealDefaultArgs<ExtArgs>
    sourceLog?: boolean | EditHistory$sourceLogArgs<ExtArgs>
  }, ExtArgs["result"]["editHistory"]>

  export type EditHistorySelectScalar = {
    id?: boolean
    userId?: boolean
    mealId?: boolean
    sourceLogId?: boolean
    editType?: boolean
    oldValue?: boolean
    newValue?: boolean
    changedAt?: boolean
  }

  export type EditHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    meal?: boolean | MealDefaultArgs<ExtArgs>
    sourceLog?: boolean | EditHistory$sourceLogArgs<ExtArgs>
  }
  export type EditHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    meal?: boolean | MealDefaultArgs<ExtArgs>
    sourceLog?: boolean | EditHistory$sourceLogArgs<ExtArgs>
  }

  export type $EditHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EditHistory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      meal: Prisma.$MealPayload<ExtArgs>
      sourceLog: Prisma.$LogPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      mealId: string
      sourceLogId: string | null
      editType: string
      oldValue: Prisma.JsonValue | null
      newValue: Prisma.JsonValue | null
      changedAt: Date
    }, ExtArgs["result"]["editHistory"]>
    composites: {}
  }

  type EditHistoryGetPayload<S extends boolean | null | undefined | EditHistoryDefaultArgs> = $Result.GetResult<Prisma.$EditHistoryPayload, S>

  type EditHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EditHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EditHistoryCountAggregateInputType | true
    }

  export interface EditHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EditHistory'], meta: { name: 'EditHistory' } }
    /**
     * Find zero or one EditHistory that matches the filter.
     * @param {EditHistoryFindUniqueArgs} args - Arguments to find a EditHistory
     * @example
     * // Get one EditHistory
     * const editHistory = await prisma.editHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EditHistoryFindUniqueArgs>(args: SelectSubset<T, EditHistoryFindUniqueArgs<ExtArgs>>): Prisma__EditHistoryClient<$Result.GetResult<Prisma.$EditHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EditHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EditHistoryFindUniqueOrThrowArgs} args - Arguments to find a EditHistory
     * @example
     * // Get one EditHistory
     * const editHistory = await prisma.editHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EditHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, EditHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EditHistoryClient<$Result.GetResult<Prisma.$EditHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EditHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EditHistoryFindFirstArgs} args - Arguments to find a EditHistory
     * @example
     * // Get one EditHistory
     * const editHistory = await prisma.editHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EditHistoryFindFirstArgs>(args?: SelectSubset<T, EditHistoryFindFirstArgs<ExtArgs>>): Prisma__EditHistoryClient<$Result.GetResult<Prisma.$EditHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EditHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EditHistoryFindFirstOrThrowArgs} args - Arguments to find a EditHistory
     * @example
     * // Get one EditHistory
     * const editHistory = await prisma.editHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EditHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, EditHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__EditHistoryClient<$Result.GetResult<Prisma.$EditHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EditHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EditHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EditHistories
     * const editHistories = await prisma.editHistory.findMany()
     * 
     * // Get first 10 EditHistories
     * const editHistories = await prisma.editHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const editHistoryWithIdOnly = await prisma.editHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EditHistoryFindManyArgs>(args?: SelectSubset<T, EditHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EditHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EditHistory.
     * @param {EditHistoryCreateArgs} args - Arguments to create a EditHistory.
     * @example
     * // Create one EditHistory
     * const EditHistory = await prisma.editHistory.create({
     *   data: {
     *     // ... data to create a EditHistory
     *   }
     * })
     * 
     */
    create<T extends EditHistoryCreateArgs>(args: SelectSubset<T, EditHistoryCreateArgs<ExtArgs>>): Prisma__EditHistoryClient<$Result.GetResult<Prisma.$EditHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EditHistories.
     * @param {EditHistoryCreateManyArgs} args - Arguments to create many EditHistories.
     * @example
     * // Create many EditHistories
     * const editHistory = await prisma.editHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EditHistoryCreateManyArgs>(args?: SelectSubset<T, EditHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EditHistories and returns the data saved in the database.
     * @param {EditHistoryCreateManyAndReturnArgs} args - Arguments to create many EditHistories.
     * @example
     * // Create many EditHistories
     * const editHistory = await prisma.editHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EditHistories and only return the `id`
     * const editHistoryWithIdOnly = await prisma.editHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EditHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, EditHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EditHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a EditHistory.
     * @param {EditHistoryDeleteArgs} args - Arguments to delete one EditHistory.
     * @example
     * // Delete one EditHistory
     * const EditHistory = await prisma.editHistory.delete({
     *   where: {
     *     // ... filter to delete one EditHistory
     *   }
     * })
     * 
     */
    delete<T extends EditHistoryDeleteArgs>(args: SelectSubset<T, EditHistoryDeleteArgs<ExtArgs>>): Prisma__EditHistoryClient<$Result.GetResult<Prisma.$EditHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EditHistory.
     * @param {EditHistoryUpdateArgs} args - Arguments to update one EditHistory.
     * @example
     * // Update one EditHistory
     * const editHistory = await prisma.editHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EditHistoryUpdateArgs>(args: SelectSubset<T, EditHistoryUpdateArgs<ExtArgs>>): Prisma__EditHistoryClient<$Result.GetResult<Prisma.$EditHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EditHistories.
     * @param {EditHistoryDeleteManyArgs} args - Arguments to filter EditHistories to delete.
     * @example
     * // Delete a few EditHistories
     * const { count } = await prisma.editHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EditHistoryDeleteManyArgs>(args?: SelectSubset<T, EditHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EditHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EditHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EditHistories
     * const editHistory = await prisma.editHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EditHistoryUpdateManyArgs>(args: SelectSubset<T, EditHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EditHistory.
     * @param {EditHistoryUpsertArgs} args - Arguments to update or create a EditHistory.
     * @example
     * // Update or create a EditHistory
     * const editHistory = await prisma.editHistory.upsert({
     *   create: {
     *     // ... data to create a EditHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EditHistory we want to update
     *   }
     * })
     */
    upsert<T extends EditHistoryUpsertArgs>(args: SelectSubset<T, EditHistoryUpsertArgs<ExtArgs>>): Prisma__EditHistoryClient<$Result.GetResult<Prisma.$EditHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EditHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EditHistoryCountArgs} args - Arguments to filter EditHistories to count.
     * @example
     * // Count the number of EditHistories
     * const count = await prisma.editHistory.count({
     *   where: {
     *     // ... the filter for the EditHistories we want to count
     *   }
     * })
    **/
    count<T extends EditHistoryCountArgs>(
      args?: Subset<T, EditHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EditHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EditHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EditHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EditHistoryAggregateArgs>(args: Subset<T, EditHistoryAggregateArgs>): Prisma.PrismaPromise<GetEditHistoryAggregateType<T>>

    /**
     * Group by EditHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EditHistoryGroupByArgs} args - Group by arguments.
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
      T extends EditHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EditHistoryGroupByArgs['orderBy'] }
        : { orderBy?: EditHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EditHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEditHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EditHistory model
   */
  readonly fields: EditHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EditHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EditHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    meal<T extends MealDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MealDefaultArgs<ExtArgs>>): Prisma__MealClient<$Result.GetResult<Prisma.$MealPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    sourceLog<T extends EditHistory$sourceLogArgs<ExtArgs> = {}>(args?: Subset<T, EditHistory$sourceLogArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the EditHistory model
   */ 
  interface EditHistoryFieldRefs {
    readonly id: FieldRef<"EditHistory", 'String'>
    readonly userId: FieldRef<"EditHistory", 'String'>
    readonly mealId: FieldRef<"EditHistory", 'String'>
    readonly sourceLogId: FieldRef<"EditHistory", 'String'>
    readonly editType: FieldRef<"EditHistory", 'String'>
    readonly oldValue: FieldRef<"EditHistory", 'Json'>
    readonly newValue: FieldRef<"EditHistory", 'Json'>
    readonly changedAt: FieldRef<"EditHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EditHistory findUnique
   */
  export type EditHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryInclude<ExtArgs> | null
    /**
     * Filter, which EditHistory to fetch.
     */
    where: EditHistoryWhereUniqueInput
  }

  /**
   * EditHistory findUniqueOrThrow
   */
  export type EditHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryInclude<ExtArgs> | null
    /**
     * Filter, which EditHistory to fetch.
     */
    where: EditHistoryWhereUniqueInput
  }

  /**
   * EditHistory findFirst
   */
  export type EditHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryInclude<ExtArgs> | null
    /**
     * Filter, which EditHistory to fetch.
     */
    where?: EditHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EditHistories to fetch.
     */
    orderBy?: EditHistoryOrderByWithRelationInput | EditHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EditHistories.
     */
    cursor?: EditHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EditHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EditHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EditHistories.
     */
    distinct?: EditHistoryScalarFieldEnum | EditHistoryScalarFieldEnum[]
  }

  /**
   * EditHistory findFirstOrThrow
   */
  export type EditHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryInclude<ExtArgs> | null
    /**
     * Filter, which EditHistory to fetch.
     */
    where?: EditHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EditHistories to fetch.
     */
    orderBy?: EditHistoryOrderByWithRelationInput | EditHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EditHistories.
     */
    cursor?: EditHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EditHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EditHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EditHistories.
     */
    distinct?: EditHistoryScalarFieldEnum | EditHistoryScalarFieldEnum[]
  }

  /**
   * EditHistory findMany
   */
  export type EditHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryInclude<ExtArgs> | null
    /**
     * Filter, which EditHistories to fetch.
     */
    where?: EditHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EditHistories to fetch.
     */
    orderBy?: EditHistoryOrderByWithRelationInput | EditHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EditHistories.
     */
    cursor?: EditHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EditHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EditHistories.
     */
    skip?: number
    distinct?: EditHistoryScalarFieldEnum | EditHistoryScalarFieldEnum[]
  }

  /**
   * EditHistory create
   */
  export type EditHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a EditHistory.
     */
    data: XOR<EditHistoryCreateInput, EditHistoryUncheckedCreateInput>
  }

  /**
   * EditHistory createMany
   */
  export type EditHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EditHistories.
     */
    data: EditHistoryCreateManyInput | EditHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EditHistory createManyAndReturn
   */
  export type EditHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many EditHistories.
     */
    data: EditHistoryCreateManyInput | EditHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EditHistory update
   */
  export type EditHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a EditHistory.
     */
    data: XOR<EditHistoryUpdateInput, EditHistoryUncheckedUpdateInput>
    /**
     * Choose, which EditHistory to update.
     */
    where: EditHistoryWhereUniqueInput
  }

  /**
   * EditHistory updateMany
   */
  export type EditHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EditHistories.
     */
    data: XOR<EditHistoryUpdateManyMutationInput, EditHistoryUncheckedUpdateManyInput>
    /**
     * Filter which EditHistories to update
     */
    where?: EditHistoryWhereInput
  }

  /**
   * EditHistory upsert
   */
  export type EditHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the EditHistory to update in case it exists.
     */
    where: EditHistoryWhereUniqueInput
    /**
     * In case the EditHistory found by the `where` argument doesn't exist, create a new EditHistory with this data.
     */
    create: XOR<EditHistoryCreateInput, EditHistoryUncheckedCreateInput>
    /**
     * In case the EditHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EditHistoryUpdateInput, EditHistoryUncheckedUpdateInput>
  }

  /**
   * EditHistory delete
   */
  export type EditHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryInclude<ExtArgs> | null
    /**
     * Filter which EditHistory to delete.
     */
    where: EditHistoryWhereUniqueInput
  }

  /**
   * EditHistory deleteMany
   */
  export type EditHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EditHistories to delete
     */
    where?: EditHistoryWhereInput
  }

  /**
   * EditHistory.sourceLog
   */
  export type EditHistory$sourceLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogInclude<ExtArgs> | null
    where?: LogWhereInput
  }

  /**
   * EditHistory without action
   */
  export type EditHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EditHistory
     */
    select?: EditHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EditHistoryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    dailyCalorieGoal: 'dailyCalorieGoal',
    weightKg: 'weightKg',
    heightCm: 'heightCm',
    age: 'age',
    sex: 'sex',
    activityLevel: 'activityLevel',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserIdentityScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    platform: 'platform',
    platformUserId: 'platformUserId',
    linkedAt: 'linkedAt',
    lastSeenAt: 'lastSeenAt',
    isPrimary: 'isPrimary'
  };

  export type UserIdentityScalarFieldEnum = (typeof UserIdentityScalarFieldEnum)[keyof typeof UserIdentityScalarFieldEnum]


  export const MagicLinkTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    platform: 'platform',
    token: 'token',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    redirectUrl: 'redirectUrl'
  };

  export type MagicLinkTokenScalarFieldEnum = (typeof MagicLinkTokenScalarFieldEnum)[keyof typeof MagicLinkTokenScalarFieldEnum]


  export const LogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    platform: 'platform',
    platformMessageId: 'platformMessageId',
    messageTimestamp: 'messageTimestamp',
    rawText: 'rawText',
    llmOutput: 'llmOutput',
    intent: 'intent',
    processingStatus: 'processingStatus',
    clarificationPrompt: 'clarificationPrompt',
    clarificationResponse: 'clarificationResponse',
    latencyMs: 'latencyMs',
    errorCode: 'errorCode',
    errorMessage: 'errorMessage',
    createdAt: 'createdAt'
  };

  export type LogScalarFieldEnum = (typeof LogScalarFieldEnum)[keyof typeof LogScalarFieldEnum]


  export const MealScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sourceLogId: 'sourceLogId',
    occasion: 'occasion',
    consumedAt: 'consumedAt',
    createdAt: 'createdAt',
    totalCalories: 'totalCalories',
    totalProteinG: 'totalProteinG',
    totalCarbsG: 'totalCarbsG',
    totalFatG: 'totalFatG'
  };

  export type MealScalarFieldEnum = (typeof MealScalarFieldEnum)[keyof typeof MealScalarFieldEnum]


  export const MealItemScalarFieldEnum: {
    id: 'id',
    mealId: 'mealId',
    foodName: 'foodName',
    quantity: 'quantity',
    unit: 'unit',
    weightG: 'weightG',
    calories: 'calories',
    proteinG: 'proteinG',
    carbsG: 'carbsG',
    fatG: 'fatG',
    nutritionApi: 'nutritionApi',
    apiRefId: 'apiRefId',
    apiResponseSnapshot: 'apiResponseSnapshot',
    resolutionConfidence: 'resolutionConfidence',
    notes: 'notes'
  };

  export type MealItemScalarFieldEnum = (typeof MealItemScalarFieldEnum)[keyof typeof MealItemScalarFieldEnum]


  export const ApiCacheScalarFieldEnum: {
    id: 'id',
    vendor: 'vendor',
    queryString: 'queryString',
    normalizedQueryHash: 'normalizedQueryHash',
    nutritionData: 'nutritionData',
    fetchedAt: 'fetchedAt',
    expiresAt: 'expiresAt'
  };

  export type ApiCacheScalarFieldEnum = (typeof ApiCacheScalarFieldEnum)[keyof typeof ApiCacheScalarFieldEnum]


  export const UserWeightHistoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    weightKg: 'weightKg',
    recordedAt: 'recordedAt',
    source: 'source'
  };

  export type UserWeightHistoryScalarFieldEnum = (typeof UserWeightHistoryScalarFieldEnum)[keyof typeof UserWeightHistoryScalarFieldEnum]


  export const EditHistoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    mealId: 'mealId',
    sourceLogId: 'sourceLogId',
    editType: 'editType',
    oldValue: 'oldValue',
    newValue: 'newValue',
    changedAt: 'changedAt'
  };

  export type EditHistoryScalarFieldEnum = (typeof EditHistoryScalarFieldEnum)[keyof typeof EditHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    dailyCalorieGoal?: IntNullableFilter<"User"> | number | null
    weightKg?: FloatNullableFilter<"User"> | number | null
    heightCm?: FloatNullableFilter<"User"> | number | null
    age?: IntNullableFilter<"User"> | number | null
    sex?: StringNullableFilter<"User"> | string | null
    activityLevel?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    identities?: UserIdentityListRelationFilter
    magicLinkTokens?: MagicLinkTokenListRelationFilter
    logs?: LogListRelationFilter
    meals?: MealListRelationFilter
    weightHistory?: UserWeightHistoryListRelationFilter
    editHistory?: EditHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    dailyCalorieGoal?: SortOrderInput | SortOrder
    weightKg?: SortOrderInput | SortOrder
    heightCm?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    sex?: SortOrderInput | SortOrder
    activityLevel?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    identities?: UserIdentityOrderByRelationAggregateInput
    magicLinkTokens?: MagicLinkTokenOrderByRelationAggregateInput
    logs?: LogOrderByRelationAggregateInput
    meals?: MealOrderByRelationAggregateInput
    weightHistory?: UserWeightHistoryOrderByRelationAggregateInput
    editHistory?: EditHistoryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    dailyCalorieGoal?: IntNullableFilter<"User"> | number | null
    weightKg?: FloatNullableFilter<"User"> | number | null
    heightCm?: FloatNullableFilter<"User"> | number | null
    age?: IntNullableFilter<"User"> | number | null
    sex?: StringNullableFilter<"User"> | string | null
    activityLevel?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    identities?: UserIdentityListRelationFilter
    magicLinkTokens?: MagicLinkTokenListRelationFilter
    logs?: LogListRelationFilter
    meals?: MealListRelationFilter
    weightHistory?: UserWeightHistoryListRelationFilter
    editHistory?: EditHistoryListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    dailyCalorieGoal?: SortOrderInput | SortOrder
    weightKg?: SortOrderInput | SortOrder
    heightCm?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    sex?: SortOrderInput | SortOrder
    activityLevel?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    dailyCalorieGoal?: IntNullableWithAggregatesFilter<"User"> | number | null
    weightKg?: FloatNullableWithAggregatesFilter<"User"> | number | null
    heightCm?: FloatNullableWithAggregatesFilter<"User"> | number | null
    age?: IntNullableWithAggregatesFilter<"User"> | number | null
    sex?: StringNullableWithAggregatesFilter<"User"> | string | null
    activityLevel?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserIdentityWhereInput = {
    AND?: UserIdentityWhereInput | UserIdentityWhereInput[]
    OR?: UserIdentityWhereInput[]
    NOT?: UserIdentityWhereInput | UserIdentityWhereInput[]
    id?: StringFilter<"UserIdentity"> | string
    userId?: StringFilter<"UserIdentity"> | string
    platform?: StringFilter<"UserIdentity"> | string
    platformUserId?: StringFilter<"UserIdentity"> | string
    linkedAt?: DateTimeFilter<"UserIdentity"> | Date | string
    lastSeenAt?: DateTimeNullableFilter<"UserIdentity"> | Date | string | null
    isPrimary?: BoolFilter<"UserIdentity"> | boolean
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserIdentityOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    platformUserId?: SortOrder
    linkedAt?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    isPrimary?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserIdentityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    platform_platformUserId?: UserIdentityPlatformPlatformUserIdCompoundUniqueInput
    AND?: UserIdentityWhereInput | UserIdentityWhereInput[]
    OR?: UserIdentityWhereInput[]
    NOT?: UserIdentityWhereInput | UserIdentityWhereInput[]
    userId?: StringFilter<"UserIdentity"> | string
    platform?: StringFilter<"UserIdentity"> | string
    platformUserId?: StringFilter<"UserIdentity"> | string
    linkedAt?: DateTimeFilter<"UserIdentity"> | Date | string
    lastSeenAt?: DateTimeNullableFilter<"UserIdentity"> | Date | string | null
    isPrimary?: BoolFilter<"UserIdentity"> | boolean
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "platform_platformUserId">

  export type UserIdentityOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    platformUserId?: SortOrder
    linkedAt?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    isPrimary?: SortOrder
    _count?: UserIdentityCountOrderByAggregateInput
    _max?: UserIdentityMaxOrderByAggregateInput
    _min?: UserIdentityMinOrderByAggregateInput
  }

  export type UserIdentityScalarWhereWithAggregatesInput = {
    AND?: UserIdentityScalarWhereWithAggregatesInput | UserIdentityScalarWhereWithAggregatesInput[]
    OR?: UserIdentityScalarWhereWithAggregatesInput[]
    NOT?: UserIdentityScalarWhereWithAggregatesInput | UserIdentityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserIdentity"> | string
    userId?: StringWithAggregatesFilter<"UserIdentity"> | string
    platform?: StringWithAggregatesFilter<"UserIdentity"> | string
    platformUserId?: StringWithAggregatesFilter<"UserIdentity"> | string
    linkedAt?: DateTimeWithAggregatesFilter<"UserIdentity"> | Date | string
    lastSeenAt?: DateTimeNullableWithAggregatesFilter<"UserIdentity"> | Date | string | null
    isPrimary?: BoolWithAggregatesFilter<"UserIdentity"> | boolean
  }

  export type MagicLinkTokenWhereInput = {
    AND?: MagicLinkTokenWhereInput | MagicLinkTokenWhereInput[]
    OR?: MagicLinkTokenWhereInput[]
    NOT?: MagicLinkTokenWhereInput | MagicLinkTokenWhereInput[]
    id?: StringFilter<"MagicLinkToken"> | string
    userId?: StringFilter<"MagicLinkToken"> | string
    platform?: StringFilter<"MagicLinkToken"> | string
    token?: StringFilter<"MagicLinkToken"> | string
    expiresAt?: DateTimeFilter<"MagicLinkToken"> | Date | string
    usedAt?: DateTimeNullableFilter<"MagicLinkToken"> | Date | string | null
    redirectUrl?: StringNullableFilter<"MagicLinkToken"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type MagicLinkTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    redirectUrl?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MagicLinkTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: MagicLinkTokenWhereInput | MagicLinkTokenWhereInput[]
    OR?: MagicLinkTokenWhereInput[]
    NOT?: MagicLinkTokenWhereInput | MagicLinkTokenWhereInput[]
    userId?: StringFilter<"MagicLinkToken"> | string
    platform?: StringFilter<"MagicLinkToken"> | string
    expiresAt?: DateTimeFilter<"MagicLinkToken"> | Date | string
    usedAt?: DateTimeNullableFilter<"MagicLinkToken"> | Date | string | null
    redirectUrl?: StringNullableFilter<"MagicLinkToken"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type MagicLinkTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    redirectUrl?: SortOrderInput | SortOrder
    _count?: MagicLinkTokenCountOrderByAggregateInput
    _max?: MagicLinkTokenMaxOrderByAggregateInput
    _min?: MagicLinkTokenMinOrderByAggregateInput
  }

  export type MagicLinkTokenScalarWhereWithAggregatesInput = {
    AND?: MagicLinkTokenScalarWhereWithAggregatesInput | MagicLinkTokenScalarWhereWithAggregatesInput[]
    OR?: MagicLinkTokenScalarWhereWithAggregatesInput[]
    NOT?: MagicLinkTokenScalarWhereWithAggregatesInput | MagicLinkTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MagicLinkToken"> | string
    userId?: StringWithAggregatesFilter<"MagicLinkToken"> | string
    platform?: StringWithAggregatesFilter<"MagicLinkToken"> | string
    token?: StringWithAggregatesFilter<"MagicLinkToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"MagicLinkToken"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"MagicLinkToken"> | Date | string | null
    redirectUrl?: StringNullableWithAggregatesFilter<"MagicLinkToken"> | string | null
  }

  export type LogWhereInput = {
    AND?: LogWhereInput | LogWhereInput[]
    OR?: LogWhereInput[]
    NOT?: LogWhereInput | LogWhereInput[]
    id?: StringFilter<"Log"> | string
    userId?: StringFilter<"Log"> | string
    platform?: StringFilter<"Log"> | string
    platformMessageId?: StringNullableFilter<"Log"> | string | null
    messageTimestamp?: DateTimeNullableFilter<"Log"> | Date | string | null
    rawText?: StringFilter<"Log"> | string
    llmOutput?: JsonNullableFilter<"Log">
    intent?: StringNullableFilter<"Log"> | string | null
    processingStatus?: StringFilter<"Log"> | string
    clarificationPrompt?: StringNullableFilter<"Log"> | string | null
    clarificationResponse?: StringNullableFilter<"Log"> | string | null
    latencyMs?: IntNullableFilter<"Log"> | number | null
    errorCode?: StringNullableFilter<"Log"> | string | null
    errorMessage?: StringNullableFilter<"Log"> | string | null
    createdAt?: DateTimeFilter<"Log"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    meals?: MealListRelationFilter
    editHistory?: EditHistoryListRelationFilter
  }

  export type LogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    platformMessageId?: SortOrderInput | SortOrder
    messageTimestamp?: SortOrderInput | SortOrder
    rawText?: SortOrder
    llmOutput?: SortOrderInput | SortOrder
    intent?: SortOrderInput | SortOrder
    processingStatus?: SortOrder
    clarificationPrompt?: SortOrderInput | SortOrder
    clarificationResponse?: SortOrderInput | SortOrder
    latencyMs?: SortOrderInput | SortOrder
    errorCode?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    meals?: MealOrderByRelationAggregateInput
    editHistory?: EditHistoryOrderByRelationAggregateInput
  }

  export type LogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LogWhereInput | LogWhereInput[]
    OR?: LogWhereInput[]
    NOT?: LogWhereInput | LogWhereInput[]
    userId?: StringFilter<"Log"> | string
    platform?: StringFilter<"Log"> | string
    platformMessageId?: StringNullableFilter<"Log"> | string | null
    messageTimestamp?: DateTimeNullableFilter<"Log"> | Date | string | null
    rawText?: StringFilter<"Log"> | string
    llmOutput?: JsonNullableFilter<"Log">
    intent?: StringNullableFilter<"Log"> | string | null
    processingStatus?: StringFilter<"Log"> | string
    clarificationPrompt?: StringNullableFilter<"Log"> | string | null
    clarificationResponse?: StringNullableFilter<"Log"> | string | null
    latencyMs?: IntNullableFilter<"Log"> | number | null
    errorCode?: StringNullableFilter<"Log"> | string | null
    errorMessage?: StringNullableFilter<"Log"> | string | null
    createdAt?: DateTimeFilter<"Log"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    meals?: MealListRelationFilter
    editHistory?: EditHistoryListRelationFilter
  }, "id">

  export type LogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    platformMessageId?: SortOrderInput | SortOrder
    messageTimestamp?: SortOrderInput | SortOrder
    rawText?: SortOrder
    llmOutput?: SortOrderInput | SortOrder
    intent?: SortOrderInput | SortOrder
    processingStatus?: SortOrder
    clarificationPrompt?: SortOrderInput | SortOrder
    clarificationResponse?: SortOrderInput | SortOrder
    latencyMs?: SortOrderInput | SortOrder
    errorCode?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LogCountOrderByAggregateInput
    _avg?: LogAvgOrderByAggregateInput
    _max?: LogMaxOrderByAggregateInput
    _min?: LogMinOrderByAggregateInput
    _sum?: LogSumOrderByAggregateInput
  }

  export type LogScalarWhereWithAggregatesInput = {
    AND?: LogScalarWhereWithAggregatesInput | LogScalarWhereWithAggregatesInput[]
    OR?: LogScalarWhereWithAggregatesInput[]
    NOT?: LogScalarWhereWithAggregatesInput | LogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Log"> | string
    userId?: StringWithAggregatesFilter<"Log"> | string
    platform?: StringWithAggregatesFilter<"Log"> | string
    platformMessageId?: StringNullableWithAggregatesFilter<"Log"> | string | null
    messageTimestamp?: DateTimeNullableWithAggregatesFilter<"Log"> | Date | string | null
    rawText?: StringWithAggregatesFilter<"Log"> | string
    llmOutput?: JsonNullableWithAggregatesFilter<"Log">
    intent?: StringNullableWithAggregatesFilter<"Log"> | string | null
    processingStatus?: StringWithAggregatesFilter<"Log"> | string
    clarificationPrompt?: StringNullableWithAggregatesFilter<"Log"> | string | null
    clarificationResponse?: StringNullableWithAggregatesFilter<"Log"> | string | null
    latencyMs?: IntNullableWithAggregatesFilter<"Log"> | number | null
    errorCode?: StringNullableWithAggregatesFilter<"Log"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"Log"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Log"> | Date | string
  }

  export type MealWhereInput = {
    AND?: MealWhereInput | MealWhereInput[]
    OR?: MealWhereInput[]
    NOT?: MealWhereInput | MealWhereInput[]
    id?: StringFilter<"Meal"> | string
    userId?: StringFilter<"Meal"> | string
    sourceLogId?: StringNullableFilter<"Meal"> | string | null
    occasion?: StringNullableFilter<"Meal"> | string | null
    consumedAt?: DateTimeFilter<"Meal"> | Date | string
    createdAt?: DateTimeFilter<"Meal"> | Date | string
    totalCalories?: IntNullableFilter<"Meal"> | number | null
    totalProteinG?: FloatNullableFilter<"Meal"> | number | null
    totalCarbsG?: FloatNullableFilter<"Meal"> | number | null
    totalFatG?: FloatNullableFilter<"Meal"> | number | null
    user?: XOR<UserRelationFilter, UserWhereInput>
    sourceLog?: XOR<LogNullableRelationFilter, LogWhereInput> | null
    items?: MealItemListRelationFilter
    editHistory?: EditHistoryListRelationFilter
  }

  export type MealOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceLogId?: SortOrderInput | SortOrder
    occasion?: SortOrderInput | SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
    totalCalories?: SortOrderInput | SortOrder
    totalProteinG?: SortOrderInput | SortOrder
    totalCarbsG?: SortOrderInput | SortOrder
    totalFatG?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    sourceLog?: LogOrderByWithRelationInput
    items?: MealItemOrderByRelationAggregateInput
    editHistory?: EditHistoryOrderByRelationAggregateInput
  }

  export type MealWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MealWhereInput | MealWhereInput[]
    OR?: MealWhereInput[]
    NOT?: MealWhereInput | MealWhereInput[]
    userId?: StringFilter<"Meal"> | string
    sourceLogId?: StringNullableFilter<"Meal"> | string | null
    occasion?: StringNullableFilter<"Meal"> | string | null
    consumedAt?: DateTimeFilter<"Meal"> | Date | string
    createdAt?: DateTimeFilter<"Meal"> | Date | string
    totalCalories?: IntNullableFilter<"Meal"> | number | null
    totalProteinG?: FloatNullableFilter<"Meal"> | number | null
    totalCarbsG?: FloatNullableFilter<"Meal"> | number | null
    totalFatG?: FloatNullableFilter<"Meal"> | number | null
    user?: XOR<UserRelationFilter, UserWhereInput>
    sourceLog?: XOR<LogNullableRelationFilter, LogWhereInput> | null
    items?: MealItemListRelationFilter
    editHistory?: EditHistoryListRelationFilter
  }, "id">

  export type MealOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceLogId?: SortOrderInput | SortOrder
    occasion?: SortOrderInput | SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
    totalCalories?: SortOrderInput | SortOrder
    totalProteinG?: SortOrderInput | SortOrder
    totalCarbsG?: SortOrderInput | SortOrder
    totalFatG?: SortOrderInput | SortOrder
    _count?: MealCountOrderByAggregateInput
    _avg?: MealAvgOrderByAggregateInput
    _max?: MealMaxOrderByAggregateInput
    _min?: MealMinOrderByAggregateInput
    _sum?: MealSumOrderByAggregateInput
  }

  export type MealScalarWhereWithAggregatesInput = {
    AND?: MealScalarWhereWithAggregatesInput | MealScalarWhereWithAggregatesInput[]
    OR?: MealScalarWhereWithAggregatesInput[]
    NOT?: MealScalarWhereWithAggregatesInput | MealScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Meal"> | string
    userId?: StringWithAggregatesFilter<"Meal"> | string
    sourceLogId?: StringNullableWithAggregatesFilter<"Meal"> | string | null
    occasion?: StringNullableWithAggregatesFilter<"Meal"> | string | null
    consumedAt?: DateTimeWithAggregatesFilter<"Meal"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Meal"> | Date | string
    totalCalories?: IntNullableWithAggregatesFilter<"Meal"> | number | null
    totalProteinG?: FloatNullableWithAggregatesFilter<"Meal"> | number | null
    totalCarbsG?: FloatNullableWithAggregatesFilter<"Meal"> | number | null
    totalFatG?: FloatNullableWithAggregatesFilter<"Meal"> | number | null
  }

  export type MealItemWhereInput = {
    AND?: MealItemWhereInput | MealItemWhereInput[]
    OR?: MealItemWhereInput[]
    NOT?: MealItemWhereInput | MealItemWhereInput[]
    id?: StringFilter<"MealItem"> | string
    mealId?: StringFilter<"MealItem"> | string
    foodName?: StringFilter<"MealItem"> | string
    quantity?: FloatFilter<"MealItem"> | number
    unit?: StringFilter<"MealItem"> | string
    weightG?: FloatNullableFilter<"MealItem"> | number | null
    calories?: IntNullableFilter<"MealItem"> | number | null
    proteinG?: FloatNullableFilter<"MealItem"> | number | null
    carbsG?: FloatNullableFilter<"MealItem"> | number | null
    fatG?: FloatNullableFilter<"MealItem"> | number | null
    nutritionApi?: StringNullableFilter<"MealItem"> | string | null
    apiRefId?: StringNullableFilter<"MealItem"> | string | null
    apiResponseSnapshot?: JsonNullableFilter<"MealItem">
    resolutionConfidence?: StringNullableFilter<"MealItem"> | string | null
    notes?: StringNullableFilter<"MealItem"> | string | null
    meal?: XOR<MealRelationFilter, MealWhereInput>
  }

  export type MealItemOrderByWithRelationInput = {
    id?: SortOrder
    mealId?: SortOrder
    foodName?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    weightG?: SortOrderInput | SortOrder
    calories?: SortOrderInput | SortOrder
    proteinG?: SortOrderInput | SortOrder
    carbsG?: SortOrderInput | SortOrder
    fatG?: SortOrderInput | SortOrder
    nutritionApi?: SortOrderInput | SortOrder
    apiRefId?: SortOrderInput | SortOrder
    apiResponseSnapshot?: SortOrderInput | SortOrder
    resolutionConfidence?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    meal?: MealOrderByWithRelationInput
  }

  export type MealItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MealItemWhereInput | MealItemWhereInput[]
    OR?: MealItemWhereInput[]
    NOT?: MealItemWhereInput | MealItemWhereInput[]
    mealId?: StringFilter<"MealItem"> | string
    foodName?: StringFilter<"MealItem"> | string
    quantity?: FloatFilter<"MealItem"> | number
    unit?: StringFilter<"MealItem"> | string
    weightG?: FloatNullableFilter<"MealItem"> | number | null
    calories?: IntNullableFilter<"MealItem"> | number | null
    proteinG?: FloatNullableFilter<"MealItem"> | number | null
    carbsG?: FloatNullableFilter<"MealItem"> | number | null
    fatG?: FloatNullableFilter<"MealItem"> | number | null
    nutritionApi?: StringNullableFilter<"MealItem"> | string | null
    apiRefId?: StringNullableFilter<"MealItem"> | string | null
    apiResponseSnapshot?: JsonNullableFilter<"MealItem">
    resolutionConfidence?: StringNullableFilter<"MealItem"> | string | null
    notes?: StringNullableFilter<"MealItem"> | string | null
    meal?: XOR<MealRelationFilter, MealWhereInput>
  }, "id">

  export type MealItemOrderByWithAggregationInput = {
    id?: SortOrder
    mealId?: SortOrder
    foodName?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    weightG?: SortOrderInput | SortOrder
    calories?: SortOrderInput | SortOrder
    proteinG?: SortOrderInput | SortOrder
    carbsG?: SortOrderInput | SortOrder
    fatG?: SortOrderInput | SortOrder
    nutritionApi?: SortOrderInput | SortOrder
    apiRefId?: SortOrderInput | SortOrder
    apiResponseSnapshot?: SortOrderInput | SortOrder
    resolutionConfidence?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: MealItemCountOrderByAggregateInput
    _avg?: MealItemAvgOrderByAggregateInput
    _max?: MealItemMaxOrderByAggregateInput
    _min?: MealItemMinOrderByAggregateInput
    _sum?: MealItemSumOrderByAggregateInput
  }

  export type MealItemScalarWhereWithAggregatesInput = {
    AND?: MealItemScalarWhereWithAggregatesInput | MealItemScalarWhereWithAggregatesInput[]
    OR?: MealItemScalarWhereWithAggregatesInput[]
    NOT?: MealItemScalarWhereWithAggregatesInput | MealItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MealItem"> | string
    mealId?: StringWithAggregatesFilter<"MealItem"> | string
    foodName?: StringWithAggregatesFilter<"MealItem"> | string
    quantity?: FloatWithAggregatesFilter<"MealItem"> | number
    unit?: StringWithAggregatesFilter<"MealItem"> | string
    weightG?: FloatNullableWithAggregatesFilter<"MealItem"> | number | null
    calories?: IntNullableWithAggregatesFilter<"MealItem"> | number | null
    proteinG?: FloatNullableWithAggregatesFilter<"MealItem"> | number | null
    carbsG?: FloatNullableWithAggregatesFilter<"MealItem"> | number | null
    fatG?: FloatNullableWithAggregatesFilter<"MealItem"> | number | null
    nutritionApi?: StringNullableWithAggregatesFilter<"MealItem"> | string | null
    apiRefId?: StringNullableWithAggregatesFilter<"MealItem"> | string | null
    apiResponseSnapshot?: JsonNullableWithAggregatesFilter<"MealItem">
    resolutionConfidence?: StringNullableWithAggregatesFilter<"MealItem"> | string | null
    notes?: StringNullableWithAggregatesFilter<"MealItem"> | string | null
  }

  export type ApiCacheWhereInput = {
    AND?: ApiCacheWhereInput | ApiCacheWhereInput[]
    OR?: ApiCacheWhereInput[]
    NOT?: ApiCacheWhereInput | ApiCacheWhereInput[]
    id?: StringFilter<"ApiCache"> | string
    vendor?: StringFilter<"ApiCache"> | string
    queryString?: StringFilter<"ApiCache"> | string
    normalizedQueryHash?: StringFilter<"ApiCache"> | string
    nutritionData?: JsonFilter<"ApiCache">
    fetchedAt?: DateTimeFilter<"ApiCache"> | Date | string
    expiresAt?: DateTimeFilter<"ApiCache"> | Date | string
  }

  export type ApiCacheOrderByWithRelationInput = {
    id?: SortOrder
    vendor?: SortOrder
    queryString?: SortOrder
    normalizedQueryHash?: SortOrder
    nutritionData?: SortOrder
    fetchedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ApiCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    normalizedQueryHash?: string
    AND?: ApiCacheWhereInput | ApiCacheWhereInput[]
    OR?: ApiCacheWhereInput[]
    NOT?: ApiCacheWhereInput | ApiCacheWhereInput[]
    vendor?: StringFilter<"ApiCache"> | string
    queryString?: StringFilter<"ApiCache"> | string
    nutritionData?: JsonFilter<"ApiCache">
    fetchedAt?: DateTimeFilter<"ApiCache"> | Date | string
    expiresAt?: DateTimeFilter<"ApiCache"> | Date | string
  }, "id" | "normalizedQueryHash">

  export type ApiCacheOrderByWithAggregationInput = {
    id?: SortOrder
    vendor?: SortOrder
    queryString?: SortOrder
    normalizedQueryHash?: SortOrder
    nutritionData?: SortOrder
    fetchedAt?: SortOrder
    expiresAt?: SortOrder
    _count?: ApiCacheCountOrderByAggregateInput
    _max?: ApiCacheMaxOrderByAggregateInput
    _min?: ApiCacheMinOrderByAggregateInput
  }

  export type ApiCacheScalarWhereWithAggregatesInput = {
    AND?: ApiCacheScalarWhereWithAggregatesInput | ApiCacheScalarWhereWithAggregatesInput[]
    OR?: ApiCacheScalarWhereWithAggregatesInput[]
    NOT?: ApiCacheScalarWhereWithAggregatesInput | ApiCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiCache"> | string
    vendor?: StringWithAggregatesFilter<"ApiCache"> | string
    queryString?: StringWithAggregatesFilter<"ApiCache"> | string
    normalizedQueryHash?: StringWithAggregatesFilter<"ApiCache"> | string
    nutritionData?: JsonWithAggregatesFilter<"ApiCache">
    fetchedAt?: DateTimeWithAggregatesFilter<"ApiCache"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"ApiCache"> | Date | string
  }

  export type UserWeightHistoryWhereInput = {
    AND?: UserWeightHistoryWhereInput | UserWeightHistoryWhereInput[]
    OR?: UserWeightHistoryWhereInput[]
    NOT?: UserWeightHistoryWhereInput | UserWeightHistoryWhereInput[]
    id?: StringFilter<"UserWeightHistory"> | string
    userId?: StringFilter<"UserWeightHistory"> | string
    weightKg?: FloatFilter<"UserWeightHistory"> | number
    recordedAt?: DateTimeFilter<"UserWeightHistory"> | Date | string
    source?: StringNullableFilter<"UserWeightHistory"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserWeightHistoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    weightKg?: SortOrder
    recordedAt?: SortOrder
    source?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserWeightHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWeightHistoryWhereInput | UserWeightHistoryWhereInput[]
    OR?: UserWeightHistoryWhereInput[]
    NOT?: UserWeightHistoryWhereInput | UserWeightHistoryWhereInput[]
    userId?: StringFilter<"UserWeightHistory"> | string
    weightKg?: FloatFilter<"UserWeightHistory"> | number
    recordedAt?: DateTimeFilter<"UserWeightHistory"> | Date | string
    source?: StringNullableFilter<"UserWeightHistory"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type UserWeightHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    weightKg?: SortOrder
    recordedAt?: SortOrder
    source?: SortOrderInput | SortOrder
    _count?: UserWeightHistoryCountOrderByAggregateInput
    _avg?: UserWeightHistoryAvgOrderByAggregateInput
    _max?: UserWeightHistoryMaxOrderByAggregateInput
    _min?: UserWeightHistoryMinOrderByAggregateInput
    _sum?: UserWeightHistorySumOrderByAggregateInput
  }

  export type UserWeightHistoryScalarWhereWithAggregatesInput = {
    AND?: UserWeightHistoryScalarWhereWithAggregatesInput | UserWeightHistoryScalarWhereWithAggregatesInput[]
    OR?: UserWeightHistoryScalarWhereWithAggregatesInput[]
    NOT?: UserWeightHistoryScalarWhereWithAggregatesInput | UserWeightHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserWeightHistory"> | string
    userId?: StringWithAggregatesFilter<"UserWeightHistory"> | string
    weightKg?: FloatWithAggregatesFilter<"UserWeightHistory"> | number
    recordedAt?: DateTimeWithAggregatesFilter<"UserWeightHistory"> | Date | string
    source?: StringNullableWithAggregatesFilter<"UserWeightHistory"> | string | null
  }

  export type EditHistoryWhereInput = {
    AND?: EditHistoryWhereInput | EditHistoryWhereInput[]
    OR?: EditHistoryWhereInput[]
    NOT?: EditHistoryWhereInput | EditHistoryWhereInput[]
    id?: StringFilter<"EditHistory"> | string
    userId?: StringFilter<"EditHistory"> | string
    mealId?: StringFilter<"EditHistory"> | string
    sourceLogId?: StringNullableFilter<"EditHistory"> | string | null
    editType?: StringFilter<"EditHistory"> | string
    oldValue?: JsonNullableFilter<"EditHistory">
    newValue?: JsonNullableFilter<"EditHistory">
    changedAt?: DateTimeFilter<"EditHistory"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    meal?: XOR<MealRelationFilter, MealWhereInput>
    sourceLog?: XOR<LogNullableRelationFilter, LogWhereInput> | null
  }

  export type EditHistoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    mealId?: SortOrder
    sourceLogId?: SortOrderInput | SortOrder
    editType?: SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    changedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    meal?: MealOrderByWithRelationInput
    sourceLog?: LogOrderByWithRelationInput
  }

  export type EditHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EditHistoryWhereInput | EditHistoryWhereInput[]
    OR?: EditHistoryWhereInput[]
    NOT?: EditHistoryWhereInput | EditHistoryWhereInput[]
    userId?: StringFilter<"EditHistory"> | string
    mealId?: StringFilter<"EditHistory"> | string
    sourceLogId?: StringNullableFilter<"EditHistory"> | string | null
    editType?: StringFilter<"EditHistory"> | string
    oldValue?: JsonNullableFilter<"EditHistory">
    newValue?: JsonNullableFilter<"EditHistory">
    changedAt?: DateTimeFilter<"EditHistory"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    meal?: XOR<MealRelationFilter, MealWhereInput>
    sourceLog?: XOR<LogNullableRelationFilter, LogWhereInput> | null
  }, "id">

  export type EditHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    mealId?: SortOrder
    sourceLogId?: SortOrderInput | SortOrder
    editType?: SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    changedAt?: SortOrder
    _count?: EditHistoryCountOrderByAggregateInput
    _max?: EditHistoryMaxOrderByAggregateInput
    _min?: EditHistoryMinOrderByAggregateInput
  }

  export type EditHistoryScalarWhereWithAggregatesInput = {
    AND?: EditHistoryScalarWhereWithAggregatesInput | EditHistoryScalarWhereWithAggregatesInput[]
    OR?: EditHistoryScalarWhereWithAggregatesInput[]
    NOT?: EditHistoryScalarWhereWithAggregatesInput | EditHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EditHistory"> | string
    userId?: StringWithAggregatesFilter<"EditHistory"> | string
    mealId?: StringWithAggregatesFilter<"EditHistory"> | string
    sourceLogId?: StringNullableWithAggregatesFilter<"EditHistory"> | string | null
    editType?: StringWithAggregatesFilter<"EditHistory"> | string
    oldValue?: JsonNullableWithAggregatesFilter<"EditHistory">
    newValue?: JsonNullableWithAggregatesFilter<"EditHistory">
    changedAt?: DateTimeWithAggregatesFilter<"EditHistory"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    identities?: UserIdentityCreateNestedManyWithoutUserInput
    magicLinkTokens?: MagicLinkTokenCreateNestedManyWithoutUserInput
    logs?: LogCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    weightHistory?: UserWeightHistoryCreateNestedManyWithoutUserInput
    editHistory?: EditHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    identities?: UserIdentityUncheckedCreateNestedManyWithoutUserInput
    magicLinkTokens?: MagicLinkTokenUncheckedCreateNestedManyWithoutUserInput
    logs?: LogUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    weightHistory?: UserWeightHistoryUncheckedCreateNestedManyWithoutUserInput
    editHistory?: EditHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: UserIdentityUpdateManyWithoutUserNestedInput
    magicLinkTokens?: MagicLinkTokenUpdateManyWithoutUserNestedInput
    logs?: LogUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    weightHistory?: UserWeightHistoryUpdateManyWithoutUserNestedInput
    editHistory?: EditHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: UserIdentityUncheckedUpdateManyWithoutUserNestedInput
    magicLinkTokens?: MagicLinkTokenUncheckedUpdateManyWithoutUserNestedInput
    logs?: LogUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    weightHistory?: UserWeightHistoryUncheckedUpdateManyWithoutUserNestedInput
    editHistory?: EditHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserIdentityCreateInput = {
    id?: string
    platform: string
    platformUserId: string
    linkedAt?: Date | string
    lastSeenAt?: Date | string | null
    isPrimary?: boolean
    user: UserCreateNestedOneWithoutIdentitiesInput
  }

  export type UserIdentityUncheckedCreateInput = {
    id?: string
    userId: string
    platform: string
    platformUserId: string
    linkedAt?: Date | string
    lastSeenAt?: Date | string | null
    isPrimary?: boolean
  }

  export type UserIdentityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformUserId?: StringFieldUpdateOperationsInput | string
    linkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutIdentitiesNestedInput
  }

  export type UserIdentityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformUserId?: StringFieldUpdateOperationsInput | string
    linkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserIdentityCreateManyInput = {
    id?: string
    userId: string
    platform: string
    platformUserId: string
    linkedAt?: Date | string
    lastSeenAt?: Date | string | null
    isPrimary?: boolean
  }

  export type UserIdentityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformUserId?: StringFieldUpdateOperationsInput | string
    linkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserIdentityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformUserId?: StringFieldUpdateOperationsInput | string
    linkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MagicLinkTokenCreateInput = {
    id?: string
    platform: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    redirectUrl?: string | null
    user: UserCreateNestedOneWithoutMagicLinkTokensInput
  }

  export type MagicLinkTokenUncheckedCreateInput = {
    id?: string
    userId: string
    platform: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    redirectUrl?: string | null
  }

  export type MagicLinkTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redirectUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutMagicLinkTokensNestedInput
  }

  export type MagicLinkTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redirectUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MagicLinkTokenCreateManyInput = {
    id?: string
    userId: string
    platform: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    redirectUrl?: string | null
  }

  export type MagicLinkTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redirectUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MagicLinkTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redirectUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LogCreateInput = {
    id?: string
    platform: string
    platformMessageId?: string | null
    messageTimestamp?: Date | string | null
    rawText: string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: string | null
    processingStatus: string
    clarificationPrompt?: string | null
    clarificationResponse?: string | null
    latencyMs?: number | null
    errorCode?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLogsInput
    meals?: MealCreateNestedManyWithoutSourceLogInput
    editHistory?: EditHistoryCreateNestedManyWithoutSourceLogInput
  }

  export type LogUncheckedCreateInput = {
    id?: string
    userId: string
    platform: string
    platformMessageId?: string | null
    messageTimestamp?: Date | string | null
    rawText: string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: string | null
    processingStatus: string
    clarificationPrompt?: string | null
    clarificationResponse?: string | null
    latencyMs?: number | null
    errorCode?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    meals?: MealUncheckedCreateNestedManyWithoutSourceLogInput
    editHistory?: EditHistoryUncheckedCreateNestedManyWithoutSourceLogInput
  }

  export type LogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    messageTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawText?: StringFieldUpdateOperationsInput | string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: StringFieldUpdateOperationsInput | string
    clarificationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    clarificationResponse?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLogsNestedInput
    meals?: MealUpdateManyWithoutSourceLogNestedInput
    editHistory?: EditHistoryUpdateManyWithoutSourceLogNestedInput
  }

  export type LogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    messageTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawText?: StringFieldUpdateOperationsInput | string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: StringFieldUpdateOperationsInput | string
    clarificationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    clarificationResponse?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meals?: MealUncheckedUpdateManyWithoutSourceLogNestedInput
    editHistory?: EditHistoryUncheckedUpdateManyWithoutSourceLogNestedInput
  }

  export type LogCreateManyInput = {
    id?: string
    userId: string
    platform: string
    platformMessageId?: string | null
    messageTimestamp?: Date | string | null
    rawText: string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: string | null
    processingStatus: string
    clarificationPrompt?: string | null
    clarificationResponse?: string | null
    latencyMs?: number | null
    errorCode?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type LogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    messageTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawText?: StringFieldUpdateOperationsInput | string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: StringFieldUpdateOperationsInput | string
    clarificationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    clarificationResponse?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    messageTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawText?: StringFieldUpdateOperationsInput | string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: StringFieldUpdateOperationsInput | string
    clarificationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    clarificationResponse?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealCreateInput = {
    id?: string
    occasion?: string | null
    consumedAt: Date | string
    createdAt?: Date | string
    totalCalories?: number | null
    totalProteinG?: number | null
    totalCarbsG?: number | null
    totalFatG?: number | null
    user: UserCreateNestedOneWithoutMealsInput
    sourceLog?: LogCreateNestedOneWithoutMealsInput
    items?: MealItemCreateNestedManyWithoutMealInput
    editHistory?: EditHistoryCreateNestedManyWithoutMealInput
  }

  export type MealUncheckedCreateInput = {
    id?: string
    userId: string
    sourceLogId?: string | null
    occasion?: string | null
    consumedAt: Date | string
    createdAt?: Date | string
    totalCalories?: number | null
    totalProteinG?: number | null
    totalCarbsG?: number | null
    totalFatG?: number | null
    items?: MealItemUncheckedCreateNestedManyWithoutMealInput
    editHistory?: EditHistoryUncheckedCreateNestedManyWithoutMealInput
  }

  export type MealUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutMealsNestedInput
    sourceLog?: LogUpdateOneWithoutMealsNestedInput
    items?: MealItemUpdateManyWithoutMealNestedInput
    editHistory?: EditHistoryUpdateManyWithoutMealNestedInput
  }

  export type MealUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceLogId?: NullableStringFieldUpdateOperationsInput | string | null
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
    items?: MealItemUncheckedUpdateManyWithoutMealNestedInput
    editHistory?: EditHistoryUncheckedUpdateManyWithoutMealNestedInput
  }

  export type MealCreateManyInput = {
    id?: string
    userId: string
    sourceLogId?: string | null
    occasion?: string | null
    consumedAt: Date | string
    createdAt?: Date | string
    totalCalories?: number | null
    totalProteinG?: number | null
    totalCarbsG?: number | null
    totalFatG?: number | null
  }

  export type MealUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type MealUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceLogId?: NullableStringFieldUpdateOperationsInput | string | null
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type MealItemCreateInput = {
    id?: string
    foodName: string
    quantity: number
    unit: string
    weightG?: number | null
    calories?: number | null
    proteinG?: number | null
    carbsG?: number | null
    fatG?: number | null
    nutritionApi?: string | null
    apiRefId?: string | null
    apiResponseSnapshot?: NullableJsonNullValueInput | InputJsonValue
    resolutionConfidence?: string | null
    notes?: string | null
    meal: MealCreateNestedOneWithoutItemsInput
  }

  export type MealItemUncheckedCreateInput = {
    id?: string
    mealId: string
    foodName: string
    quantity: number
    unit: string
    weightG?: number | null
    calories?: number | null
    proteinG?: number | null
    carbsG?: number | null
    fatG?: number | null
    nutritionApi?: string | null
    apiRefId?: string | null
    apiResponseSnapshot?: NullableJsonNullValueInput | InputJsonValue
    resolutionConfidence?: string | null
    notes?: string | null
  }

  export type MealItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    foodName?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    weightG?: NullableFloatFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    proteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    carbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    fatG?: NullableFloatFieldUpdateOperationsInput | number | null
    nutritionApi?: NullableStringFieldUpdateOperationsInput | string | null
    apiRefId?: NullableStringFieldUpdateOperationsInput | string | null
    apiResponseSnapshot?: NullableJsonNullValueInput | InputJsonValue
    resolutionConfidence?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    meal?: MealUpdateOneRequiredWithoutItemsNestedInput
  }

  export type MealItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealId?: StringFieldUpdateOperationsInput | string
    foodName?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    weightG?: NullableFloatFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    proteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    carbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    fatG?: NullableFloatFieldUpdateOperationsInput | number | null
    nutritionApi?: NullableStringFieldUpdateOperationsInput | string | null
    apiRefId?: NullableStringFieldUpdateOperationsInput | string | null
    apiResponseSnapshot?: NullableJsonNullValueInput | InputJsonValue
    resolutionConfidence?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MealItemCreateManyInput = {
    id?: string
    mealId: string
    foodName: string
    quantity: number
    unit: string
    weightG?: number | null
    calories?: number | null
    proteinG?: number | null
    carbsG?: number | null
    fatG?: number | null
    nutritionApi?: string | null
    apiRefId?: string | null
    apiResponseSnapshot?: NullableJsonNullValueInput | InputJsonValue
    resolutionConfidence?: string | null
    notes?: string | null
  }

  export type MealItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    foodName?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    weightG?: NullableFloatFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    proteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    carbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    fatG?: NullableFloatFieldUpdateOperationsInput | number | null
    nutritionApi?: NullableStringFieldUpdateOperationsInput | string | null
    apiRefId?: NullableStringFieldUpdateOperationsInput | string | null
    apiResponseSnapshot?: NullableJsonNullValueInput | InputJsonValue
    resolutionConfidence?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MealItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealId?: StringFieldUpdateOperationsInput | string
    foodName?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    weightG?: NullableFloatFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    proteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    carbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    fatG?: NullableFloatFieldUpdateOperationsInput | number | null
    nutritionApi?: NullableStringFieldUpdateOperationsInput | string | null
    apiRefId?: NullableStringFieldUpdateOperationsInput | string | null
    apiResponseSnapshot?: NullableJsonNullValueInput | InputJsonValue
    resolutionConfidence?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApiCacheCreateInput = {
    id?: string
    vendor: string
    queryString: string
    normalizedQueryHash: string
    nutritionData: JsonNullValueInput | InputJsonValue
    fetchedAt?: Date | string
    expiresAt: Date | string
  }

  export type ApiCacheUncheckedCreateInput = {
    id?: string
    vendor: string
    queryString: string
    normalizedQueryHash: string
    nutritionData: JsonNullValueInput | InputJsonValue
    fetchedAt?: Date | string
    expiresAt: Date | string
  }

  export type ApiCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendor?: StringFieldUpdateOperationsInput | string
    queryString?: StringFieldUpdateOperationsInput | string
    normalizedQueryHash?: StringFieldUpdateOperationsInput | string
    nutritionData?: JsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendor?: StringFieldUpdateOperationsInput | string
    queryString?: StringFieldUpdateOperationsInput | string
    normalizedQueryHash?: StringFieldUpdateOperationsInput | string
    nutritionData?: JsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiCacheCreateManyInput = {
    id?: string
    vendor: string
    queryString: string
    normalizedQueryHash: string
    nutritionData: JsonNullValueInput | InputJsonValue
    fetchedAt?: Date | string
    expiresAt: Date | string
  }

  export type ApiCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendor?: StringFieldUpdateOperationsInput | string
    queryString?: StringFieldUpdateOperationsInput | string
    normalizedQueryHash?: StringFieldUpdateOperationsInput | string
    nutritionData?: JsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendor?: StringFieldUpdateOperationsInput | string
    queryString?: StringFieldUpdateOperationsInput | string
    normalizedQueryHash?: StringFieldUpdateOperationsInput | string
    nutritionData?: JsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWeightHistoryCreateInput = {
    id?: string
    weightKg: number
    recordedAt?: Date | string
    source?: string | null
    user: UserCreateNestedOneWithoutWeightHistoryInput
  }

  export type UserWeightHistoryUncheckedCreateInput = {
    id?: string
    userId: string
    weightKg: number
    recordedAt?: Date | string
    source?: string | null
  }

  export type UserWeightHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutWeightHistoryNestedInput
  }

  export type UserWeightHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserWeightHistoryCreateManyInput = {
    id?: string
    userId: string
    weightKg: number
    recordedAt?: Date | string
    source?: string | null
  }

  export type UserWeightHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserWeightHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EditHistoryCreateInput = {
    id?: string
    editType: string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: Date | string
    user: UserCreateNestedOneWithoutEditHistoryInput
    meal: MealCreateNestedOneWithoutEditHistoryInput
    sourceLog?: LogCreateNestedOneWithoutEditHistoryInput
  }

  export type EditHistoryUncheckedCreateInput = {
    id?: string
    userId: string
    mealId: string
    sourceLogId?: string | null
    editType: string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: Date | string
  }

  export type EditHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    editType?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEditHistoryNestedInput
    meal?: MealUpdateOneRequiredWithoutEditHistoryNestedInput
    sourceLog?: LogUpdateOneWithoutEditHistoryNestedInput
  }

  export type EditHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mealId?: StringFieldUpdateOperationsInput | string
    sourceLogId?: NullableStringFieldUpdateOperationsInput | string | null
    editType?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EditHistoryCreateManyInput = {
    id?: string
    userId: string
    mealId: string
    sourceLogId?: string | null
    editType: string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: Date | string
  }

  export type EditHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    editType?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EditHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mealId?: StringFieldUpdateOperationsInput | string
    sourceLogId?: NullableStringFieldUpdateOperationsInput | string | null
    editType?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type UserIdentityListRelationFilter = {
    every?: UserIdentityWhereInput
    some?: UserIdentityWhereInput
    none?: UserIdentityWhereInput
  }

  export type MagicLinkTokenListRelationFilter = {
    every?: MagicLinkTokenWhereInput
    some?: MagicLinkTokenWhereInput
    none?: MagicLinkTokenWhereInput
  }

  export type LogListRelationFilter = {
    every?: LogWhereInput
    some?: LogWhereInput
    none?: LogWhereInput
  }

  export type MealListRelationFilter = {
    every?: MealWhereInput
    some?: MealWhereInput
    none?: MealWhereInput
  }

  export type UserWeightHistoryListRelationFilter = {
    every?: UserWeightHistoryWhereInput
    some?: UserWeightHistoryWhereInput
    none?: UserWeightHistoryWhereInput
  }

  export type EditHistoryListRelationFilter = {
    every?: EditHistoryWhereInput
    some?: EditHistoryWhereInput
    none?: EditHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserIdentityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MagicLinkTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MealOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserWeightHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EditHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    dailyCalorieGoal?: SortOrder
    weightKg?: SortOrder
    heightCm?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    activityLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    dailyCalorieGoal?: SortOrder
    weightKg?: SortOrder
    heightCm?: SortOrder
    age?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    dailyCalorieGoal?: SortOrder
    weightKg?: SortOrder
    heightCm?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    activityLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    dailyCalorieGoal?: SortOrder
    weightKg?: SortOrder
    heightCm?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    activityLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    dailyCalorieGoal?: SortOrder
    weightKg?: SortOrder
    heightCm?: SortOrder
    age?: SortOrder
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
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserIdentityPlatformPlatformUserIdCompoundUniqueInput = {
    platform: string
    platformUserId: string
  }

  export type UserIdentityCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    platformUserId?: SortOrder
    linkedAt?: SortOrder
    lastSeenAt?: SortOrder
    isPrimary?: SortOrder
  }

  export type UserIdentityMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    platformUserId?: SortOrder
    linkedAt?: SortOrder
    lastSeenAt?: SortOrder
    isPrimary?: SortOrder
  }

  export type UserIdentityMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    platformUserId?: SortOrder
    linkedAt?: SortOrder
    lastSeenAt?: SortOrder
    isPrimary?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MagicLinkTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    redirectUrl?: SortOrder
  }

  export type MagicLinkTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    redirectUrl?: SortOrder
  }

  export type MagicLinkTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    redirectUrl?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type LogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    platformMessageId?: SortOrder
    messageTimestamp?: SortOrder
    rawText?: SortOrder
    llmOutput?: SortOrder
    intent?: SortOrder
    processingStatus?: SortOrder
    clarificationPrompt?: SortOrder
    clarificationResponse?: SortOrder
    latencyMs?: SortOrder
    errorCode?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type LogAvgOrderByAggregateInput = {
    latencyMs?: SortOrder
  }

  export type LogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    platformMessageId?: SortOrder
    messageTimestamp?: SortOrder
    rawText?: SortOrder
    intent?: SortOrder
    processingStatus?: SortOrder
    clarificationPrompt?: SortOrder
    clarificationResponse?: SortOrder
    latencyMs?: SortOrder
    errorCode?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type LogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    platformMessageId?: SortOrder
    messageTimestamp?: SortOrder
    rawText?: SortOrder
    intent?: SortOrder
    processingStatus?: SortOrder
    clarificationPrompt?: SortOrder
    clarificationResponse?: SortOrder
    latencyMs?: SortOrder
    errorCode?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type LogSumOrderByAggregateInput = {
    latencyMs?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type LogNullableRelationFilter = {
    is?: LogWhereInput | null
    isNot?: LogWhereInput | null
  }

  export type MealItemListRelationFilter = {
    every?: MealItemWhereInput
    some?: MealItemWhereInput
    none?: MealItemWhereInput
  }

  export type MealItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MealCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceLogId?: SortOrder
    occasion?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
    totalCalories?: SortOrder
    totalProteinG?: SortOrder
    totalCarbsG?: SortOrder
    totalFatG?: SortOrder
  }

  export type MealAvgOrderByAggregateInput = {
    totalCalories?: SortOrder
    totalProteinG?: SortOrder
    totalCarbsG?: SortOrder
    totalFatG?: SortOrder
  }

  export type MealMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceLogId?: SortOrder
    occasion?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
    totalCalories?: SortOrder
    totalProteinG?: SortOrder
    totalCarbsG?: SortOrder
    totalFatG?: SortOrder
  }

  export type MealMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceLogId?: SortOrder
    occasion?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
    totalCalories?: SortOrder
    totalProteinG?: SortOrder
    totalCarbsG?: SortOrder
    totalFatG?: SortOrder
  }

  export type MealSumOrderByAggregateInput = {
    totalCalories?: SortOrder
    totalProteinG?: SortOrder
    totalCarbsG?: SortOrder
    totalFatG?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type MealRelationFilter = {
    is?: MealWhereInput
    isNot?: MealWhereInput
  }

  export type MealItemCountOrderByAggregateInput = {
    id?: SortOrder
    mealId?: SortOrder
    foodName?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    weightG?: SortOrder
    calories?: SortOrder
    proteinG?: SortOrder
    carbsG?: SortOrder
    fatG?: SortOrder
    nutritionApi?: SortOrder
    apiRefId?: SortOrder
    apiResponseSnapshot?: SortOrder
    resolutionConfidence?: SortOrder
    notes?: SortOrder
  }

  export type MealItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    weightG?: SortOrder
    calories?: SortOrder
    proteinG?: SortOrder
    carbsG?: SortOrder
    fatG?: SortOrder
  }

  export type MealItemMaxOrderByAggregateInput = {
    id?: SortOrder
    mealId?: SortOrder
    foodName?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    weightG?: SortOrder
    calories?: SortOrder
    proteinG?: SortOrder
    carbsG?: SortOrder
    fatG?: SortOrder
    nutritionApi?: SortOrder
    apiRefId?: SortOrder
    resolutionConfidence?: SortOrder
    notes?: SortOrder
  }

  export type MealItemMinOrderByAggregateInput = {
    id?: SortOrder
    mealId?: SortOrder
    foodName?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    weightG?: SortOrder
    calories?: SortOrder
    proteinG?: SortOrder
    carbsG?: SortOrder
    fatG?: SortOrder
    nutritionApi?: SortOrder
    apiRefId?: SortOrder
    resolutionConfidence?: SortOrder
    notes?: SortOrder
  }

  export type MealItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    weightG?: SortOrder
    calories?: SortOrder
    proteinG?: SortOrder
    carbsG?: SortOrder
    fatG?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ApiCacheCountOrderByAggregateInput = {
    id?: SortOrder
    vendor?: SortOrder
    queryString?: SortOrder
    normalizedQueryHash?: SortOrder
    nutritionData?: SortOrder
    fetchedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ApiCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    vendor?: SortOrder
    queryString?: SortOrder
    normalizedQueryHash?: SortOrder
    fetchedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ApiCacheMinOrderByAggregateInput = {
    id?: SortOrder
    vendor?: SortOrder
    queryString?: SortOrder
    normalizedQueryHash?: SortOrder
    fetchedAt?: SortOrder
    expiresAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type UserWeightHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    weightKg?: SortOrder
    recordedAt?: SortOrder
    source?: SortOrder
  }

  export type UserWeightHistoryAvgOrderByAggregateInput = {
    weightKg?: SortOrder
  }

  export type UserWeightHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    weightKg?: SortOrder
    recordedAt?: SortOrder
    source?: SortOrder
  }

  export type UserWeightHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    weightKg?: SortOrder
    recordedAt?: SortOrder
    source?: SortOrder
  }

  export type UserWeightHistorySumOrderByAggregateInput = {
    weightKg?: SortOrder
  }

  export type EditHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mealId?: SortOrder
    sourceLogId?: SortOrder
    editType?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    changedAt?: SortOrder
  }

  export type EditHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mealId?: SortOrder
    sourceLogId?: SortOrder
    editType?: SortOrder
    changedAt?: SortOrder
  }

  export type EditHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mealId?: SortOrder
    sourceLogId?: SortOrder
    editType?: SortOrder
    changedAt?: SortOrder
  }

  export type UserIdentityCreateNestedManyWithoutUserInput = {
    create?: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput> | UserIdentityCreateWithoutUserInput[] | UserIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserIdentityCreateOrConnectWithoutUserInput | UserIdentityCreateOrConnectWithoutUserInput[]
    createMany?: UserIdentityCreateManyUserInputEnvelope
    connect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
  }

  export type MagicLinkTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<MagicLinkTokenCreateWithoutUserInput, MagicLinkTokenUncheckedCreateWithoutUserInput> | MagicLinkTokenCreateWithoutUserInput[] | MagicLinkTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MagicLinkTokenCreateOrConnectWithoutUserInput | MagicLinkTokenCreateOrConnectWithoutUserInput[]
    createMany?: MagicLinkTokenCreateManyUserInputEnvelope
    connect?: MagicLinkTokenWhereUniqueInput | MagicLinkTokenWhereUniqueInput[]
  }

  export type LogCreateNestedManyWithoutUserInput = {
    create?: XOR<LogCreateWithoutUserInput, LogUncheckedCreateWithoutUserInput> | LogCreateWithoutUserInput[] | LogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LogCreateOrConnectWithoutUserInput | LogCreateOrConnectWithoutUserInput[]
    createMany?: LogCreateManyUserInputEnvelope
    connect?: LogWhereUniqueInput | LogWhereUniqueInput[]
  }

  export type MealCreateNestedManyWithoutUserInput = {
    create?: XOR<MealCreateWithoutUserInput, MealUncheckedCreateWithoutUserInput> | MealCreateWithoutUserInput[] | MealUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealCreateOrConnectWithoutUserInput | MealCreateOrConnectWithoutUserInput[]
    createMany?: MealCreateManyUserInputEnvelope
    connect?: MealWhereUniqueInput | MealWhereUniqueInput[]
  }

  export type UserWeightHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<UserWeightHistoryCreateWithoutUserInput, UserWeightHistoryUncheckedCreateWithoutUserInput> | UserWeightHistoryCreateWithoutUserInput[] | UserWeightHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWeightHistoryCreateOrConnectWithoutUserInput | UserWeightHistoryCreateOrConnectWithoutUserInput[]
    createMany?: UserWeightHistoryCreateManyUserInputEnvelope
    connect?: UserWeightHistoryWhereUniqueInput | UserWeightHistoryWhereUniqueInput[]
  }

  export type EditHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<EditHistoryCreateWithoutUserInput, EditHistoryUncheckedCreateWithoutUserInput> | EditHistoryCreateWithoutUserInput[] | EditHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EditHistoryCreateOrConnectWithoutUserInput | EditHistoryCreateOrConnectWithoutUserInput[]
    createMany?: EditHistoryCreateManyUserInputEnvelope
    connect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
  }

  export type UserIdentityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput> | UserIdentityCreateWithoutUserInput[] | UserIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserIdentityCreateOrConnectWithoutUserInput | UserIdentityCreateOrConnectWithoutUserInput[]
    createMany?: UserIdentityCreateManyUserInputEnvelope
    connect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
  }

  export type MagicLinkTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MagicLinkTokenCreateWithoutUserInput, MagicLinkTokenUncheckedCreateWithoutUserInput> | MagicLinkTokenCreateWithoutUserInput[] | MagicLinkTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MagicLinkTokenCreateOrConnectWithoutUserInput | MagicLinkTokenCreateOrConnectWithoutUserInput[]
    createMany?: MagicLinkTokenCreateManyUserInputEnvelope
    connect?: MagicLinkTokenWhereUniqueInput | MagicLinkTokenWhereUniqueInput[]
  }

  export type LogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LogCreateWithoutUserInput, LogUncheckedCreateWithoutUserInput> | LogCreateWithoutUserInput[] | LogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LogCreateOrConnectWithoutUserInput | LogCreateOrConnectWithoutUserInput[]
    createMany?: LogCreateManyUserInputEnvelope
    connect?: LogWhereUniqueInput | LogWhereUniqueInput[]
  }

  export type MealUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MealCreateWithoutUserInput, MealUncheckedCreateWithoutUserInput> | MealCreateWithoutUserInput[] | MealUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealCreateOrConnectWithoutUserInput | MealCreateOrConnectWithoutUserInput[]
    createMany?: MealCreateManyUserInputEnvelope
    connect?: MealWhereUniqueInput | MealWhereUniqueInput[]
  }

  export type UserWeightHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserWeightHistoryCreateWithoutUserInput, UserWeightHistoryUncheckedCreateWithoutUserInput> | UserWeightHistoryCreateWithoutUserInput[] | UserWeightHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWeightHistoryCreateOrConnectWithoutUserInput | UserWeightHistoryCreateOrConnectWithoutUserInput[]
    createMany?: UserWeightHistoryCreateManyUserInputEnvelope
    connect?: UserWeightHistoryWhereUniqueInput | UserWeightHistoryWhereUniqueInput[]
  }

  export type EditHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EditHistoryCreateWithoutUserInput, EditHistoryUncheckedCreateWithoutUserInput> | EditHistoryCreateWithoutUserInput[] | EditHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EditHistoryCreateOrConnectWithoutUserInput | EditHistoryCreateOrConnectWithoutUserInput[]
    createMany?: EditHistoryCreateManyUserInputEnvelope
    connect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserIdentityUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput> | UserIdentityCreateWithoutUserInput[] | UserIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserIdentityCreateOrConnectWithoutUserInput | UserIdentityCreateOrConnectWithoutUserInput[]
    upsert?: UserIdentityUpsertWithWhereUniqueWithoutUserInput | UserIdentityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserIdentityCreateManyUserInputEnvelope
    set?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    disconnect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    delete?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    connect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    update?: UserIdentityUpdateWithWhereUniqueWithoutUserInput | UserIdentityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserIdentityUpdateManyWithWhereWithoutUserInput | UserIdentityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserIdentityScalarWhereInput | UserIdentityScalarWhereInput[]
  }

  export type MagicLinkTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<MagicLinkTokenCreateWithoutUserInput, MagicLinkTokenUncheckedCreateWithoutUserInput> | MagicLinkTokenCreateWithoutUserInput[] | MagicLinkTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MagicLinkTokenCreateOrConnectWithoutUserInput | MagicLinkTokenCreateOrConnectWithoutUserInput[]
    upsert?: MagicLinkTokenUpsertWithWhereUniqueWithoutUserInput | MagicLinkTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MagicLinkTokenCreateManyUserInputEnvelope
    set?: MagicLinkTokenWhereUniqueInput | MagicLinkTokenWhereUniqueInput[]
    disconnect?: MagicLinkTokenWhereUniqueInput | MagicLinkTokenWhereUniqueInput[]
    delete?: MagicLinkTokenWhereUniqueInput | MagicLinkTokenWhereUniqueInput[]
    connect?: MagicLinkTokenWhereUniqueInput | MagicLinkTokenWhereUniqueInput[]
    update?: MagicLinkTokenUpdateWithWhereUniqueWithoutUserInput | MagicLinkTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MagicLinkTokenUpdateManyWithWhereWithoutUserInput | MagicLinkTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MagicLinkTokenScalarWhereInput | MagicLinkTokenScalarWhereInput[]
  }

  export type LogUpdateManyWithoutUserNestedInput = {
    create?: XOR<LogCreateWithoutUserInput, LogUncheckedCreateWithoutUserInput> | LogCreateWithoutUserInput[] | LogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LogCreateOrConnectWithoutUserInput | LogCreateOrConnectWithoutUserInput[]
    upsert?: LogUpsertWithWhereUniqueWithoutUserInput | LogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LogCreateManyUserInputEnvelope
    set?: LogWhereUniqueInput | LogWhereUniqueInput[]
    disconnect?: LogWhereUniqueInput | LogWhereUniqueInput[]
    delete?: LogWhereUniqueInput | LogWhereUniqueInput[]
    connect?: LogWhereUniqueInput | LogWhereUniqueInput[]
    update?: LogUpdateWithWhereUniqueWithoutUserInput | LogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LogUpdateManyWithWhereWithoutUserInput | LogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LogScalarWhereInput | LogScalarWhereInput[]
  }

  export type MealUpdateManyWithoutUserNestedInput = {
    create?: XOR<MealCreateWithoutUserInput, MealUncheckedCreateWithoutUserInput> | MealCreateWithoutUserInput[] | MealUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealCreateOrConnectWithoutUserInput | MealCreateOrConnectWithoutUserInput[]
    upsert?: MealUpsertWithWhereUniqueWithoutUserInput | MealUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MealCreateManyUserInputEnvelope
    set?: MealWhereUniqueInput | MealWhereUniqueInput[]
    disconnect?: MealWhereUniqueInput | MealWhereUniqueInput[]
    delete?: MealWhereUniqueInput | MealWhereUniqueInput[]
    connect?: MealWhereUniqueInput | MealWhereUniqueInput[]
    update?: MealUpdateWithWhereUniqueWithoutUserInput | MealUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MealUpdateManyWithWhereWithoutUserInput | MealUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MealScalarWhereInput | MealScalarWhereInput[]
  }

  export type UserWeightHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserWeightHistoryCreateWithoutUserInput, UserWeightHistoryUncheckedCreateWithoutUserInput> | UserWeightHistoryCreateWithoutUserInput[] | UserWeightHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWeightHistoryCreateOrConnectWithoutUserInput | UserWeightHistoryCreateOrConnectWithoutUserInput[]
    upsert?: UserWeightHistoryUpsertWithWhereUniqueWithoutUserInput | UserWeightHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserWeightHistoryCreateManyUserInputEnvelope
    set?: UserWeightHistoryWhereUniqueInput | UserWeightHistoryWhereUniqueInput[]
    disconnect?: UserWeightHistoryWhereUniqueInput | UserWeightHistoryWhereUniqueInput[]
    delete?: UserWeightHistoryWhereUniqueInput | UserWeightHistoryWhereUniqueInput[]
    connect?: UserWeightHistoryWhereUniqueInput | UserWeightHistoryWhereUniqueInput[]
    update?: UserWeightHistoryUpdateWithWhereUniqueWithoutUserInput | UserWeightHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserWeightHistoryUpdateManyWithWhereWithoutUserInput | UserWeightHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserWeightHistoryScalarWhereInput | UserWeightHistoryScalarWhereInput[]
  }

  export type EditHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<EditHistoryCreateWithoutUserInput, EditHistoryUncheckedCreateWithoutUserInput> | EditHistoryCreateWithoutUserInput[] | EditHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EditHistoryCreateOrConnectWithoutUserInput | EditHistoryCreateOrConnectWithoutUserInput[]
    upsert?: EditHistoryUpsertWithWhereUniqueWithoutUserInput | EditHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EditHistoryCreateManyUserInputEnvelope
    set?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    disconnect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    delete?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    connect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    update?: EditHistoryUpdateWithWhereUniqueWithoutUserInput | EditHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EditHistoryUpdateManyWithWhereWithoutUserInput | EditHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EditHistoryScalarWhereInput | EditHistoryScalarWhereInput[]
  }

  export type UserIdentityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput> | UserIdentityCreateWithoutUserInput[] | UserIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserIdentityCreateOrConnectWithoutUserInput | UserIdentityCreateOrConnectWithoutUserInput[]
    upsert?: UserIdentityUpsertWithWhereUniqueWithoutUserInput | UserIdentityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserIdentityCreateManyUserInputEnvelope
    set?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    disconnect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    delete?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    connect?: UserIdentityWhereUniqueInput | UserIdentityWhereUniqueInput[]
    update?: UserIdentityUpdateWithWhereUniqueWithoutUserInput | UserIdentityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserIdentityUpdateManyWithWhereWithoutUserInput | UserIdentityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserIdentityScalarWhereInput | UserIdentityScalarWhereInput[]
  }

  export type MagicLinkTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MagicLinkTokenCreateWithoutUserInput, MagicLinkTokenUncheckedCreateWithoutUserInput> | MagicLinkTokenCreateWithoutUserInput[] | MagicLinkTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MagicLinkTokenCreateOrConnectWithoutUserInput | MagicLinkTokenCreateOrConnectWithoutUserInput[]
    upsert?: MagicLinkTokenUpsertWithWhereUniqueWithoutUserInput | MagicLinkTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MagicLinkTokenCreateManyUserInputEnvelope
    set?: MagicLinkTokenWhereUniqueInput | MagicLinkTokenWhereUniqueInput[]
    disconnect?: MagicLinkTokenWhereUniqueInput | MagicLinkTokenWhereUniqueInput[]
    delete?: MagicLinkTokenWhereUniqueInput | MagicLinkTokenWhereUniqueInput[]
    connect?: MagicLinkTokenWhereUniqueInput | MagicLinkTokenWhereUniqueInput[]
    update?: MagicLinkTokenUpdateWithWhereUniqueWithoutUserInput | MagicLinkTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MagicLinkTokenUpdateManyWithWhereWithoutUserInput | MagicLinkTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MagicLinkTokenScalarWhereInput | MagicLinkTokenScalarWhereInput[]
  }

  export type LogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LogCreateWithoutUserInput, LogUncheckedCreateWithoutUserInput> | LogCreateWithoutUserInput[] | LogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LogCreateOrConnectWithoutUserInput | LogCreateOrConnectWithoutUserInput[]
    upsert?: LogUpsertWithWhereUniqueWithoutUserInput | LogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LogCreateManyUserInputEnvelope
    set?: LogWhereUniqueInput | LogWhereUniqueInput[]
    disconnect?: LogWhereUniqueInput | LogWhereUniqueInput[]
    delete?: LogWhereUniqueInput | LogWhereUniqueInput[]
    connect?: LogWhereUniqueInput | LogWhereUniqueInput[]
    update?: LogUpdateWithWhereUniqueWithoutUserInput | LogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LogUpdateManyWithWhereWithoutUserInput | LogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LogScalarWhereInput | LogScalarWhereInput[]
  }

  export type MealUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MealCreateWithoutUserInput, MealUncheckedCreateWithoutUserInput> | MealCreateWithoutUserInput[] | MealUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealCreateOrConnectWithoutUserInput | MealCreateOrConnectWithoutUserInput[]
    upsert?: MealUpsertWithWhereUniqueWithoutUserInput | MealUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MealCreateManyUserInputEnvelope
    set?: MealWhereUniqueInput | MealWhereUniqueInput[]
    disconnect?: MealWhereUniqueInput | MealWhereUniqueInput[]
    delete?: MealWhereUniqueInput | MealWhereUniqueInput[]
    connect?: MealWhereUniqueInput | MealWhereUniqueInput[]
    update?: MealUpdateWithWhereUniqueWithoutUserInput | MealUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MealUpdateManyWithWhereWithoutUserInput | MealUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MealScalarWhereInput | MealScalarWhereInput[]
  }

  export type UserWeightHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserWeightHistoryCreateWithoutUserInput, UserWeightHistoryUncheckedCreateWithoutUserInput> | UserWeightHistoryCreateWithoutUserInput[] | UserWeightHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWeightHistoryCreateOrConnectWithoutUserInput | UserWeightHistoryCreateOrConnectWithoutUserInput[]
    upsert?: UserWeightHistoryUpsertWithWhereUniqueWithoutUserInput | UserWeightHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserWeightHistoryCreateManyUserInputEnvelope
    set?: UserWeightHistoryWhereUniqueInput | UserWeightHistoryWhereUniqueInput[]
    disconnect?: UserWeightHistoryWhereUniqueInput | UserWeightHistoryWhereUniqueInput[]
    delete?: UserWeightHistoryWhereUniqueInput | UserWeightHistoryWhereUniqueInput[]
    connect?: UserWeightHistoryWhereUniqueInput | UserWeightHistoryWhereUniqueInput[]
    update?: UserWeightHistoryUpdateWithWhereUniqueWithoutUserInput | UserWeightHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserWeightHistoryUpdateManyWithWhereWithoutUserInput | UserWeightHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserWeightHistoryScalarWhereInput | UserWeightHistoryScalarWhereInput[]
  }

  export type EditHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EditHistoryCreateWithoutUserInput, EditHistoryUncheckedCreateWithoutUserInput> | EditHistoryCreateWithoutUserInput[] | EditHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EditHistoryCreateOrConnectWithoutUserInput | EditHistoryCreateOrConnectWithoutUserInput[]
    upsert?: EditHistoryUpsertWithWhereUniqueWithoutUserInput | EditHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EditHistoryCreateManyUserInputEnvelope
    set?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    disconnect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    delete?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    connect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    update?: EditHistoryUpdateWithWhereUniqueWithoutUserInput | EditHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EditHistoryUpdateManyWithWhereWithoutUserInput | EditHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EditHistoryScalarWhereInput | EditHistoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutIdentitiesInput = {
    create?: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutIdentitiesInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutIdentitiesNestedInput = {
    create?: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutIdentitiesInput
    upsert?: UserUpsertWithoutIdentitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutIdentitiesInput, UserUpdateWithoutIdentitiesInput>, UserUncheckedUpdateWithoutIdentitiesInput>
  }

  export type UserCreateNestedOneWithoutMagicLinkTokensInput = {
    create?: XOR<UserCreateWithoutMagicLinkTokensInput, UserUncheckedCreateWithoutMagicLinkTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutMagicLinkTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMagicLinkTokensNestedInput = {
    create?: XOR<UserCreateWithoutMagicLinkTokensInput, UserUncheckedCreateWithoutMagicLinkTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutMagicLinkTokensInput
    upsert?: UserUpsertWithoutMagicLinkTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMagicLinkTokensInput, UserUpdateWithoutMagicLinkTokensInput>, UserUncheckedUpdateWithoutMagicLinkTokensInput>
  }

  export type UserCreateNestedOneWithoutLogsInput = {
    create?: XOR<UserCreateWithoutLogsInput, UserUncheckedCreateWithoutLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLogsInput
    connect?: UserWhereUniqueInput
  }

  export type MealCreateNestedManyWithoutSourceLogInput = {
    create?: XOR<MealCreateWithoutSourceLogInput, MealUncheckedCreateWithoutSourceLogInput> | MealCreateWithoutSourceLogInput[] | MealUncheckedCreateWithoutSourceLogInput[]
    connectOrCreate?: MealCreateOrConnectWithoutSourceLogInput | MealCreateOrConnectWithoutSourceLogInput[]
    createMany?: MealCreateManySourceLogInputEnvelope
    connect?: MealWhereUniqueInput | MealWhereUniqueInput[]
  }

  export type EditHistoryCreateNestedManyWithoutSourceLogInput = {
    create?: XOR<EditHistoryCreateWithoutSourceLogInput, EditHistoryUncheckedCreateWithoutSourceLogInput> | EditHistoryCreateWithoutSourceLogInput[] | EditHistoryUncheckedCreateWithoutSourceLogInput[]
    connectOrCreate?: EditHistoryCreateOrConnectWithoutSourceLogInput | EditHistoryCreateOrConnectWithoutSourceLogInput[]
    createMany?: EditHistoryCreateManySourceLogInputEnvelope
    connect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
  }

  export type MealUncheckedCreateNestedManyWithoutSourceLogInput = {
    create?: XOR<MealCreateWithoutSourceLogInput, MealUncheckedCreateWithoutSourceLogInput> | MealCreateWithoutSourceLogInput[] | MealUncheckedCreateWithoutSourceLogInput[]
    connectOrCreate?: MealCreateOrConnectWithoutSourceLogInput | MealCreateOrConnectWithoutSourceLogInput[]
    createMany?: MealCreateManySourceLogInputEnvelope
    connect?: MealWhereUniqueInput | MealWhereUniqueInput[]
  }

  export type EditHistoryUncheckedCreateNestedManyWithoutSourceLogInput = {
    create?: XOR<EditHistoryCreateWithoutSourceLogInput, EditHistoryUncheckedCreateWithoutSourceLogInput> | EditHistoryCreateWithoutSourceLogInput[] | EditHistoryUncheckedCreateWithoutSourceLogInput[]
    connectOrCreate?: EditHistoryCreateOrConnectWithoutSourceLogInput | EditHistoryCreateOrConnectWithoutSourceLogInput[]
    createMany?: EditHistoryCreateManySourceLogInputEnvelope
    connect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<UserCreateWithoutLogsInput, UserUncheckedCreateWithoutLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLogsInput
    upsert?: UserUpsertWithoutLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLogsInput, UserUpdateWithoutLogsInput>, UserUncheckedUpdateWithoutLogsInput>
  }

  export type MealUpdateManyWithoutSourceLogNestedInput = {
    create?: XOR<MealCreateWithoutSourceLogInput, MealUncheckedCreateWithoutSourceLogInput> | MealCreateWithoutSourceLogInput[] | MealUncheckedCreateWithoutSourceLogInput[]
    connectOrCreate?: MealCreateOrConnectWithoutSourceLogInput | MealCreateOrConnectWithoutSourceLogInput[]
    upsert?: MealUpsertWithWhereUniqueWithoutSourceLogInput | MealUpsertWithWhereUniqueWithoutSourceLogInput[]
    createMany?: MealCreateManySourceLogInputEnvelope
    set?: MealWhereUniqueInput | MealWhereUniqueInput[]
    disconnect?: MealWhereUniqueInput | MealWhereUniqueInput[]
    delete?: MealWhereUniqueInput | MealWhereUniqueInput[]
    connect?: MealWhereUniqueInput | MealWhereUniqueInput[]
    update?: MealUpdateWithWhereUniqueWithoutSourceLogInput | MealUpdateWithWhereUniqueWithoutSourceLogInput[]
    updateMany?: MealUpdateManyWithWhereWithoutSourceLogInput | MealUpdateManyWithWhereWithoutSourceLogInput[]
    deleteMany?: MealScalarWhereInput | MealScalarWhereInput[]
  }

  export type EditHistoryUpdateManyWithoutSourceLogNestedInput = {
    create?: XOR<EditHistoryCreateWithoutSourceLogInput, EditHistoryUncheckedCreateWithoutSourceLogInput> | EditHistoryCreateWithoutSourceLogInput[] | EditHistoryUncheckedCreateWithoutSourceLogInput[]
    connectOrCreate?: EditHistoryCreateOrConnectWithoutSourceLogInput | EditHistoryCreateOrConnectWithoutSourceLogInput[]
    upsert?: EditHistoryUpsertWithWhereUniqueWithoutSourceLogInput | EditHistoryUpsertWithWhereUniqueWithoutSourceLogInput[]
    createMany?: EditHistoryCreateManySourceLogInputEnvelope
    set?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    disconnect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    delete?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    connect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    update?: EditHistoryUpdateWithWhereUniqueWithoutSourceLogInput | EditHistoryUpdateWithWhereUniqueWithoutSourceLogInput[]
    updateMany?: EditHistoryUpdateManyWithWhereWithoutSourceLogInput | EditHistoryUpdateManyWithWhereWithoutSourceLogInput[]
    deleteMany?: EditHistoryScalarWhereInput | EditHistoryScalarWhereInput[]
  }

  export type MealUncheckedUpdateManyWithoutSourceLogNestedInput = {
    create?: XOR<MealCreateWithoutSourceLogInput, MealUncheckedCreateWithoutSourceLogInput> | MealCreateWithoutSourceLogInput[] | MealUncheckedCreateWithoutSourceLogInput[]
    connectOrCreate?: MealCreateOrConnectWithoutSourceLogInput | MealCreateOrConnectWithoutSourceLogInput[]
    upsert?: MealUpsertWithWhereUniqueWithoutSourceLogInput | MealUpsertWithWhereUniqueWithoutSourceLogInput[]
    createMany?: MealCreateManySourceLogInputEnvelope
    set?: MealWhereUniqueInput | MealWhereUniqueInput[]
    disconnect?: MealWhereUniqueInput | MealWhereUniqueInput[]
    delete?: MealWhereUniqueInput | MealWhereUniqueInput[]
    connect?: MealWhereUniqueInput | MealWhereUniqueInput[]
    update?: MealUpdateWithWhereUniqueWithoutSourceLogInput | MealUpdateWithWhereUniqueWithoutSourceLogInput[]
    updateMany?: MealUpdateManyWithWhereWithoutSourceLogInput | MealUpdateManyWithWhereWithoutSourceLogInput[]
    deleteMany?: MealScalarWhereInput | MealScalarWhereInput[]
  }

  export type EditHistoryUncheckedUpdateManyWithoutSourceLogNestedInput = {
    create?: XOR<EditHistoryCreateWithoutSourceLogInput, EditHistoryUncheckedCreateWithoutSourceLogInput> | EditHistoryCreateWithoutSourceLogInput[] | EditHistoryUncheckedCreateWithoutSourceLogInput[]
    connectOrCreate?: EditHistoryCreateOrConnectWithoutSourceLogInput | EditHistoryCreateOrConnectWithoutSourceLogInput[]
    upsert?: EditHistoryUpsertWithWhereUniqueWithoutSourceLogInput | EditHistoryUpsertWithWhereUniqueWithoutSourceLogInput[]
    createMany?: EditHistoryCreateManySourceLogInputEnvelope
    set?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    disconnect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    delete?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    connect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    update?: EditHistoryUpdateWithWhereUniqueWithoutSourceLogInput | EditHistoryUpdateWithWhereUniqueWithoutSourceLogInput[]
    updateMany?: EditHistoryUpdateManyWithWhereWithoutSourceLogInput | EditHistoryUpdateManyWithWhereWithoutSourceLogInput[]
    deleteMany?: EditHistoryScalarWhereInput | EditHistoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMealsInput = {
    create?: XOR<UserCreateWithoutMealsInput, UserUncheckedCreateWithoutMealsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMealsInput
    connect?: UserWhereUniqueInput
  }

  export type LogCreateNestedOneWithoutMealsInput = {
    create?: XOR<LogCreateWithoutMealsInput, LogUncheckedCreateWithoutMealsInput>
    connectOrCreate?: LogCreateOrConnectWithoutMealsInput
    connect?: LogWhereUniqueInput
  }

  export type MealItemCreateNestedManyWithoutMealInput = {
    create?: XOR<MealItemCreateWithoutMealInput, MealItemUncheckedCreateWithoutMealInput> | MealItemCreateWithoutMealInput[] | MealItemUncheckedCreateWithoutMealInput[]
    connectOrCreate?: MealItemCreateOrConnectWithoutMealInput | MealItemCreateOrConnectWithoutMealInput[]
    createMany?: MealItemCreateManyMealInputEnvelope
    connect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
  }

  export type EditHistoryCreateNestedManyWithoutMealInput = {
    create?: XOR<EditHistoryCreateWithoutMealInput, EditHistoryUncheckedCreateWithoutMealInput> | EditHistoryCreateWithoutMealInput[] | EditHistoryUncheckedCreateWithoutMealInput[]
    connectOrCreate?: EditHistoryCreateOrConnectWithoutMealInput | EditHistoryCreateOrConnectWithoutMealInput[]
    createMany?: EditHistoryCreateManyMealInputEnvelope
    connect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
  }

  export type MealItemUncheckedCreateNestedManyWithoutMealInput = {
    create?: XOR<MealItemCreateWithoutMealInput, MealItemUncheckedCreateWithoutMealInput> | MealItemCreateWithoutMealInput[] | MealItemUncheckedCreateWithoutMealInput[]
    connectOrCreate?: MealItemCreateOrConnectWithoutMealInput | MealItemCreateOrConnectWithoutMealInput[]
    createMany?: MealItemCreateManyMealInputEnvelope
    connect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
  }

  export type EditHistoryUncheckedCreateNestedManyWithoutMealInput = {
    create?: XOR<EditHistoryCreateWithoutMealInput, EditHistoryUncheckedCreateWithoutMealInput> | EditHistoryCreateWithoutMealInput[] | EditHistoryUncheckedCreateWithoutMealInput[]
    connectOrCreate?: EditHistoryCreateOrConnectWithoutMealInput | EditHistoryCreateOrConnectWithoutMealInput[]
    createMany?: EditHistoryCreateManyMealInputEnvelope
    connect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutMealsNestedInput = {
    create?: XOR<UserCreateWithoutMealsInput, UserUncheckedCreateWithoutMealsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMealsInput
    upsert?: UserUpsertWithoutMealsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMealsInput, UserUpdateWithoutMealsInput>, UserUncheckedUpdateWithoutMealsInput>
  }

  export type LogUpdateOneWithoutMealsNestedInput = {
    create?: XOR<LogCreateWithoutMealsInput, LogUncheckedCreateWithoutMealsInput>
    connectOrCreate?: LogCreateOrConnectWithoutMealsInput
    upsert?: LogUpsertWithoutMealsInput
    disconnect?: LogWhereInput | boolean
    delete?: LogWhereInput | boolean
    connect?: LogWhereUniqueInput
    update?: XOR<XOR<LogUpdateToOneWithWhereWithoutMealsInput, LogUpdateWithoutMealsInput>, LogUncheckedUpdateWithoutMealsInput>
  }

  export type MealItemUpdateManyWithoutMealNestedInput = {
    create?: XOR<MealItemCreateWithoutMealInput, MealItemUncheckedCreateWithoutMealInput> | MealItemCreateWithoutMealInput[] | MealItemUncheckedCreateWithoutMealInput[]
    connectOrCreate?: MealItemCreateOrConnectWithoutMealInput | MealItemCreateOrConnectWithoutMealInput[]
    upsert?: MealItemUpsertWithWhereUniqueWithoutMealInput | MealItemUpsertWithWhereUniqueWithoutMealInput[]
    createMany?: MealItemCreateManyMealInputEnvelope
    set?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    disconnect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    delete?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    connect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    update?: MealItemUpdateWithWhereUniqueWithoutMealInput | MealItemUpdateWithWhereUniqueWithoutMealInput[]
    updateMany?: MealItemUpdateManyWithWhereWithoutMealInput | MealItemUpdateManyWithWhereWithoutMealInput[]
    deleteMany?: MealItemScalarWhereInput | MealItemScalarWhereInput[]
  }

  export type EditHistoryUpdateManyWithoutMealNestedInput = {
    create?: XOR<EditHistoryCreateWithoutMealInput, EditHistoryUncheckedCreateWithoutMealInput> | EditHistoryCreateWithoutMealInput[] | EditHistoryUncheckedCreateWithoutMealInput[]
    connectOrCreate?: EditHistoryCreateOrConnectWithoutMealInput | EditHistoryCreateOrConnectWithoutMealInput[]
    upsert?: EditHistoryUpsertWithWhereUniqueWithoutMealInput | EditHistoryUpsertWithWhereUniqueWithoutMealInput[]
    createMany?: EditHistoryCreateManyMealInputEnvelope
    set?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    disconnect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    delete?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    connect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    update?: EditHistoryUpdateWithWhereUniqueWithoutMealInput | EditHistoryUpdateWithWhereUniqueWithoutMealInput[]
    updateMany?: EditHistoryUpdateManyWithWhereWithoutMealInput | EditHistoryUpdateManyWithWhereWithoutMealInput[]
    deleteMany?: EditHistoryScalarWhereInput | EditHistoryScalarWhereInput[]
  }

  export type MealItemUncheckedUpdateManyWithoutMealNestedInput = {
    create?: XOR<MealItemCreateWithoutMealInput, MealItemUncheckedCreateWithoutMealInput> | MealItemCreateWithoutMealInput[] | MealItemUncheckedCreateWithoutMealInput[]
    connectOrCreate?: MealItemCreateOrConnectWithoutMealInput | MealItemCreateOrConnectWithoutMealInput[]
    upsert?: MealItemUpsertWithWhereUniqueWithoutMealInput | MealItemUpsertWithWhereUniqueWithoutMealInput[]
    createMany?: MealItemCreateManyMealInputEnvelope
    set?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    disconnect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    delete?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    connect?: MealItemWhereUniqueInput | MealItemWhereUniqueInput[]
    update?: MealItemUpdateWithWhereUniqueWithoutMealInput | MealItemUpdateWithWhereUniqueWithoutMealInput[]
    updateMany?: MealItemUpdateManyWithWhereWithoutMealInput | MealItemUpdateManyWithWhereWithoutMealInput[]
    deleteMany?: MealItemScalarWhereInput | MealItemScalarWhereInput[]
  }

  export type EditHistoryUncheckedUpdateManyWithoutMealNestedInput = {
    create?: XOR<EditHistoryCreateWithoutMealInput, EditHistoryUncheckedCreateWithoutMealInput> | EditHistoryCreateWithoutMealInput[] | EditHistoryUncheckedCreateWithoutMealInput[]
    connectOrCreate?: EditHistoryCreateOrConnectWithoutMealInput | EditHistoryCreateOrConnectWithoutMealInput[]
    upsert?: EditHistoryUpsertWithWhereUniqueWithoutMealInput | EditHistoryUpsertWithWhereUniqueWithoutMealInput[]
    createMany?: EditHistoryCreateManyMealInputEnvelope
    set?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    disconnect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    delete?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    connect?: EditHistoryWhereUniqueInput | EditHistoryWhereUniqueInput[]
    update?: EditHistoryUpdateWithWhereUniqueWithoutMealInput | EditHistoryUpdateWithWhereUniqueWithoutMealInput[]
    updateMany?: EditHistoryUpdateManyWithWhereWithoutMealInput | EditHistoryUpdateManyWithWhereWithoutMealInput[]
    deleteMany?: EditHistoryScalarWhereInput | EditHistoryScalarWhereInput[]
  }

  export type MealCreateNestedOneWithoutItemsInput = {
    create?: XOR<MealCreateWithoutItemsInput, MealUncheckedCreateWithoutItemsInput>
    connectOrCreate?: MealCreateOrConnectWithoutItemsInput
    connect?: MealWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MealUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<MealCreateWithoutItemsInput, MealUncheckedCreateWithoutItemsInput>
    connectOrCreate?: MealCreateOrConnectWithoutItemsInput
    upsert?: MealUpsertWithoutItemsInput
    connect?: MealWhereUniqueInput
    update?: XOR<XOR<MealUpdateToOneWithWhereWithoutItemsInput, MealUpdateWithoutItemsInput>, MealUncheckedUpdateWithoutItemsInput>
  }

  export type UserCreateNestedOneWithoutWeightHistoryInput = {
    create?: XOR<UserCreateWithoutWeightHistoryInput, UserUncheckedCreateWithoutWeightHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutWeightHistoryInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWeightHistoryNestedInput = {
    create?: XOR<UserCreateWithoutWeightHistoryInput, UserUncheckedCreateWithoutWeightHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutWeightHistoryInput
    upsert?: UserUpsertWithoutWeightHistoryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWeightHistoryInput, UserUpdateWithoutWeightHistoryInput>, UserUncheckedUpdateWithoutWeightHistoryInput>
  }

  export type UserCreateNestedOneWithoutEditHistoryInput = {
    create?: XOR<UserCreateWithoutEditHistoryInput, UserUncheckedCreateWithoutEditHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutEditHistoryInput
    connect?: UserWhereUniqueInput
  }

  export type MealCreateNestedOneWithoutEditHistoryInput = {
    create?: XOR<MealCreateWithoutEditHistoryInput, MealUncheckedCreateWithoutEditHistoryInput>
    connectOrCreate?: MealCreateOrConnectWithoutEditHistoryInput
    connect?: MealWhereUniqueInput
  }

  export type LogCreateNestedOneWithoutEditHistoryInput = {
    create?: XOR<LogCreateWithoutEditHistoryInput, LogUncheckedCreateWithoutEditHistoryInput>
    connectOrCreate?: LogCreateOrConnectWithoutEditHistoryInput
    connect?: LogWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEditHistoryNestedInput = {
    create?: XOR<UserCreateWithoutEditHistoryInput, UserUncheckedCreateWithoutEditHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutEditHistoryInput
    upsert?: UserUpsertWithoutEditHistoryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEditHistoryInput, UserUpdateWithoutEditHistoryInput>, UserUncheckedUpdateWithoutEditHistoryInput>
  }

  export type MealUpdateOneRequiredWithoutEditHistoryNestedInput = {
    create?: XOR<MealCreateWithoutEditHistoryInput, MealUncheckedCreateWithoutEditHistoryInput>
    connectOrCreate?: MealCreateOrConnectWithoutEditHistoryInput
    upsert?: MealUpsertWithoutEditHistoryInput
    connect?: MealWhereUniqueInput
    update?: XOR<XOR<MealUpdateToOneWithWhereWithoutEditHistoryInput, MealUpdateWithoutEditHistoryInput>, MealUncheckedUpdateWithoutEditHistoryInput>
  }

  export type LogUpdateOneWithoutEditHistoryNestedInput = {
    create?: XOR<LogCreateWithoutEditHistoryInput, LogUncheckedCreateWithoutEditHistoryInput>
    connectOrCreate?: LogCreateOrConnectWithoutEditHistoryInput
    upsert?: LogUpsertWithoutEditHistoryInput
    disconnect?: LogWhereInput | boolean
    delete?: LogWhereInput | boolean
    connect?: LogWhereUniqueInput
    update?: XOR<XOR<LogUpdateToOneWithWhereWithoutEditHistoryInput, LogUpdateWithoutEditHistoryInput>, LogUncheckedUpdateWithoutEditHistoryInput>
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
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserIdentityCreateWithoutUserInput = {
    id?: string
    platform: string
    platformUserId: string
    linkedAt?: Date | string
    lastSeenAt?: Date | string | null
    isPrimary?: boolean
  }

  export type UserIdentityUncheckedCreateWithoutUserInput = {
    id?: string
    platform: string
    platformUserId: string
    linkedAt?: Date | string
    lastSeenAt?: Date | string | null
    isPrimary?: boolean
  }

  export type UserIdentityCreateOrConnectWithoutUserInput = {
    where: UserIdentityWhereUniqueInput
    create: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput>
  }

  export type UserIdentityCreateManyUserInputEnvelope = {
    data: UserIdentityCreateManyUserInput | UserIdentityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MagicLinkTokenCreateWithoutUserInput = {
    id?: string
    platform: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    redirectUrl?: string | null
  }

  export type MagicLinkTokenUncheckedCreateWithoutUserInput = {
    id?: string
    platform: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    redirectUrl?: string | null
  }

  export type MagicLinkTokenCreateOrConnectWithoutUserInput = {
    where: MagicLinkTokenWhereUniqueInput
    create: XOR<MagicLinkTokenCreateWithoutUserInput, MagicLinkTokenUncheckedCreateWithoutUserInput>
  }

  export type MagicLinkTokenCreateManyUserInputEnvelope = {
    data: MagicLinkTokenCreateManyUserInput | MagicLinkTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LogCreateWithoutUserInput = {
    id?: string
    platform: string
    platformMessageId?: string | null
    messageTimestamp?: Date | string | null
    rawText: string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: string | null
    processingStatus: string
    clarificationPrompt?: string | null
    clarificationResponse?: string | null
    latencyMs?: number | null
    errorCode?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    meals?: MealCreateNestedManyWithoutSourceLogInput
    editHistory?: EditHistoryCreateNestedManyWithoutSourceLogInput
  }

  export type LogUncheckedCreateWithoutUserInput = {
    id?: string
    platform: string
    platformMessageId?: string | null
    messageTimestamp?: Date | string | null
    rawText: string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: string | null
    processingStatus: string
    clarificationPrompt?: string | null
    clarificationResponse?: string | null
    latencyMs?: number | null
    errorCode?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    meals?: MealUncheckedCreateNestedManyWithoutSourceLogInput
    editHistory?: EditHistoryUncheckedCreateNestedManyWithoutSourceLogInput
  }

  export type LogCreateOrConnectWithoutUserInput = {
    where: LogWhereUniqueInput
    create: XOR<LogCreateWithoutUserInput, LogUncheckedCreateWithoutUserInput>
  }

  export type LogCreateManyUserInputEnvelope = {
    data: LogCreateManyUserInput | LogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MealCreateWithoutUserInput = {
    id?: string
    occasion?: string | null
    consumedAt: Date | string
    createdAt?: Date | string
    totalCalories?: number | null
    totalProteinG?: number | null
    totalCarbsG?: number | null
    totalFatG?: number | null
    sourceLog?: LogCreateNestedOneWithoutMealsInput
    items?: MealItemCreateNestedManyWithoutMealInput
    editHistory?: EditHistoryCreateNestedManyWithoutMealInput
  }

  export type MealUncheckedCreateWithoutUserInput = {
    id?: string
    sourceLogId?: string | null
    occasion?: string | null
    consumedAt: Date | string
    createdAt?: Date | string
    totalCalories?: number | null
    totalProteinG?: number | null
    totalCarbsG?: number | null
    totalFatG?: number | null
    items?: MealItemUncheckedCreateNestedManyWithoutMealInput
    editHistory?: EditHistoryUncheckedCreateNestedManyWithoutMealInput
  }

  export type MealCreateOrConnectWithoutUserInput = {
    where: MealWhereUniqueInput
    create: XOR<MealCreateWithoutUserInput, MealUncheckedCreateWithoutUserInput>
  }

  export type MealCreateManyUserInputEnvelope = {
    data: MealCreateManyUserInput | MealCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserWeightHistoryCreateWithoutUserInput = {
    id?: string
    weightKg: number
    recordedAt?: Date | string
    source?: string | null
  }

  export type UserWeightHistoryUncheckedCreateWithoutUserInput = {
    id?: string
    weightKg: number
    recordedAt?: Date | string
    source?: string | null
  }

  export type UserWeightHistoryCreateOrConnectWithoutUserInput = {
    where: UserWeightHistoryWhereUniqueInput
    create: XOR<UserWeightHistoryCreateWithoutUserInput, UserWeightHistoryUncheckedCreateWithoutUserInput>
  }

  export type UserWeightHistoryCreateManyUserInputEnvelope = {
    data: UserWeightHistoryCreateManyUserInput | UserWeightHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EditHistoryCreateWithoutUserInput = {
    id?: string
    editType: string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: Date | string
    meal: MealCreateNestedOneWithoutEditHistoryInput
    sourceLog?: LogCreateNestedOneWithoutEditHistoryInput
  }

  export type EditHistoryUncheckedCreateWithoutUserInput = {
    id?: string
    mealId: string
    sourceLogId?: string | null
    editType: string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: Date | string
  }

  export type EditHistoryCreateOrConnectWithoutUserInput = {
    where: EditHistoryWhereUniqueInput
    create: XOR<EditHistoryCreateWithoutUserInput, EditHistoryUncheckedCreateWithoutUserInput>
  }

  export type EditHistoryCreateManyUserInputEnvelope = {
    data: EditHistoryCreateManyUserInput | EditHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserIdentityUpsertWithWhereUniqueWithoutUserInput = {
    where: UserIdentityWhereUniqueInput
    update: XOR<UserIdentityUpdateWithoutUserInput, UserIdentityUncheckedUpdateWithoutUserInput>
    create: XOR<UserIdentityCreateWithoutUserInput, UserIdentityUncheckedCreateWithoutUserInput>
  }

  export type UserIdentityUpdateWithWhereUniqueWithoutUserInput = {
    where: UserIdentityWhereUniqueInput
    data: XOR<UserIdentityUpdateWithoutUserInput, UserIdentityUncheckedUpdateWithoutUserInput>
  }

  export type UserIdentityUpdateManyWithWhereWithoutUserInput = {
    where: UserIdentityScalarWhereInput
    data: XOR<UserIdentityUpdateManyMutationInput, UserIdentityUncheckedUpdateManyWithoutUserInput>
  }

  export type UserIdentityScalarWhereInput = {
    AND?: UserIdentityScalarWhereInput | UserIdentityScalarWhereInput[]
    OR?: UserIdentityScalarWhereInput[]
    NOT?: UserIdentityScalarWhereInput | UserIdentityScalarWhereInput[]
    id?: StringFilter<"UserIdentity"> | string
    userId?: StringFilter<"UserIdentity"> | string
    platform?: StringFilter<"UserIdentity"> | string
    platformUserId?: StringFilter<"UserIdentity"> | string
    linkedAt?: DateTimeFilter<"UserIdentity"> | Date | string
    lastSeenAt?: DateTimeNullableFilter<"UserIdentity"> | Date | string | null
    isPrimary?: BoolFilter<"UserIdentity"> | boolean
  }

  export type MagicLinkTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: MagicLinkTokenWhereUniqueInput
    update: XOR<MagicLinkTokenUpdateWithoutUserInput, MagicLinkTokenUncheckedUpdateWithoutUserInput>
    create: XOR<MagicLinkTokenCreateWithoutUserInput, MagicLinkTokenUncheckedCreateWithoutUserInput>
  }

  export type MagicLinkTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: MagicLinkTokenWhereUniqueInput
    data: XOR<MagicLinkTokenUpdateWithoutUserInput, MagicLinkTokenUncheckedUpdateWithoutUserInput>
  }

  export type MagicLinkTokenUpdateManyWithWhereWithoutUserInput = {
    where: MagicLinkTokenScalarWhereInput
    data: XOR<MagicLinkTokenUpdateManyMutationInput, MagicLinkTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type MagicLinkTokenScalarWhereInput = {
    AND?: MagicLinkTokenScalarWhereInput | MagicLinkTokenScalarWhereInput[]
    OR?: MagicLinkTokenScalarWhereInput[]
    NOT?: MagicLinkTokenScalarWhereInput | MagicLinkTokenScalarWhereInput[]
    id?: StringFilter<"MagicLinkToken"> | string
    userId?: StringFilter<"MagicLinkToken"> | string
    platform?: StringFilter<"MagicLinkToken"> | string
    token?: StringFilter<"MagicLinkToken"> | string
    expiresAt?: DateTimeFilter<"MagicLinkToken"> | Date | string
    usedAt?: DateTimeNullableFilter<"MagicLinkToken"> | Date | string | null
    redirectUrl?: StringNullableFilter<"MagicLinkToken"> | string | null
  }

  export type LogUpsertWithWhereUniqueWithoutUserInput = {
    where: LogWhereUniqueInput
    update: XOR<LogUpdateWithoutUserInput, LogUncheckedUpdateWithoutUserInput>
    create: XOR<LogCreateWithoutUserInput, LogUncheckedCreateWithoutUserInput>
  }

  export type LogUpdateWithWhereUniqueWithoutUserInput = {
    where: LogWhereUniqueInput
    data: XOR<LogUpdateWithoutUserInput, LogUncheckedUpdateWithoutUserInput>
  }

  export type LogUpdateManyWithWhereWithoutUserInput = {
    where: LogScalarWhereInput
    data: XOR<LogUpdateManyMutationInput, LogUncheckedUpdateManyWithoutUserInput>
  }

  export type LogScalarWhereInput = {
    AND?: LogScalarWhereInput | LogScalarWhereInput[]
    OR?: LogScalarWhereInput[]
    NOT?: LogScalarWhereInput | LogScalarWhereInput[]
    id?: StringFilter<"Log"> | string
    userId?: StringFilter<"Log"> | string
    platform?: StringFilter<"Log"> | string
    platformMessageId?: StringNullableFilter<"Log"> | string | null
    messageTimestamp?: DateTimeNullableFilter<"Log"> | Date | string | null
    rawText?: StringFilter<"Log"> | string
    llmOutput?: JsonNullableFilter<"Log">
    intent?: StringNullableFilter<"Log"> | string | null
    processingStatus?: StringFilter<"Log"> | string
    clarificationPrompt?: StringNullableFilter<"Log"> | string | null
    clarificationResponse?: StringNullableFilter<"Log"> | string | null
    latencyMs?: IntNullableFilter<"Log"> | number | null
    errorCode?: StringNullableFilter<"Log"> | string | null
    errorMessage?: StringNullableFilter<"Log"> | string | null
    createdAt?: DateTimeFilter<"Log"> | Date | string
  }

  export type MealUpsertWithWhereUniqueWithoutUserInput = {
    where: MealWhereUniqueInput
    update: XOR<MealUpdateWithoutUserInput, MealUncheckedUpdateWithoutUserInput>
    create: XOR<MealCreateWithoutUserInput, MealUncheckedCreateWithoutUserInput>
  }

  export type MealUpdateWithWhereUniqueWithoutUserInput = {
    where: MealWhereUniqueInput
    data: XOR<MealUpdateWithoutUserInput, MealUncheckedUpdateWithoutUserInput>
  }

  export type MealUpdateManyWithWhereWithoutUserInput = {
    where: MealScalarWhereInput
    data: XOR<MealUpdateManyMutationInput, MealUncheckedUpdateManyWithoutUserInput>
  }

  export type MealScalarWhereInput = {
    AND?: MealScalarWhereInput | MealScalarWhereInput[]
    OR?: MealScalarWhereInput[]
    NOT?: MealScalarWhereInput | MealScalarWhereInput[]
    id?: StringFilter<"Meal"> | string
    userId?: StringFilter<"Meal"> | string
    sourceLogId?: StringNullableFilter<"Meal"> | string | null
    occasion?: StringNullableFilter<"Meal"> | string | null
    consumedAt?: DateTimeFilter<"Meal"> | Date | string
    createdAt?: DateTimeFilter<"Meal"> | Date | string
    totalCalories?: IntNullableFilter<"Meal"> | number | null
    totalProteinG?: FloatNullableFilter<"Meal"> | number | null
    totalCarbsG?: FloatNullableFilter<"Meal"> | number | null
    totalFatG?: FloatNullableFilter<"Meal"> | number | null
  }

  export type UserWeightHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: UserWeightHistoryWhereUniqueInput
    update: XOR<UserWeightHistoryUpdateWithoutUserInput, UserWeightHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<UserWeightHistoryCreateWithoutUserInput, UserWeightHistoryUncheckedCreateWithoutUserInput>
  }

  export type UserWeightHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: UserWeightHistoryWhereUniqueInput
    data: XOR<UserWeightHistoryUpdateWithoutUserInput, UserWeightHistoryUncheckedUpdateWithoutUserInput>
  }

  export type UserWeightHistoryUpdateManyWithWhereWithoutUserInput = {
    where: UserWeightHistoryScalarWhereInput
    data: XOR<UserWeightHistoryUpdateManyMutationInput, UserWeightHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type UserWeightHistoryScalarWhereInput = {
    AND?: UserWeightHistoryScalarWhereInput | UserWeightHistoryScalarWhereInput[]
    OR?: UserWeightHistoryScalarWhereInput[]
    NOT?: UserWeightHistoryScalarWhereInput | UserWeightHistoryScalarWhereInput[]
    id?: StringFilter<"UserWeightHistory"> | string
    userId?: StringFilter<"UserWeightHistory"> | string
    weightKg?: FloatFilter<"UserWeightHistory"> | number
    recordedAt?: DateTimeFilter<"UserWeightHistory"> | Date | string
    source?: StringNullableFilter<"UserWeightHistory"> | string | null
  }

  export type EditHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: EditHistoryWhereUniqueInput
    update: XOR<EditHistoryUpdateWithoutUserInput, EditHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<EditHistoryCreateWithoutUserInput, EditHistoryUncheckedCreateWithoutUserInput>
  }

  export type EditHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: EditHistoryWhereUniqueInput
    data: XOR<EditHistoryUpdateWithoutUserInput, EditHistoryUncheckedUpdateWithoutUserInput>
  }

  export type EditHistoryUpdateManyWithWhereWithoutUserInput = {
    where: EditHistoryScalarWhereInput
    data: XOR<EditHistoryUpdateManyMutationInput, EditHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type EditHistoryScalarWhereInput = {
    AND?: EditHistoryScalarWhereInput | EditHistoryScalarWhereInput[]
    OR?: EditHistoryScalarWhereInput[]
    NOT?: EditHistoryScalarWhereInput | EditHistoryScalarWhereInput[]
    id?: StringFilter<"EditHistory"> | string
    userId?: StringFilter<"EditHistory"> | string
    mealId?: StringFilter<"EditHistory"> | string
    sourceLogId?: StringNullableFilter<"EditHistory"> | string | null
    editType?: StringFilter<"EditHistory"> | string
    oldValue?: JsonNullableFilter<"EditHistory">
    newValue?: JsonNullableFilter<"EditHistory">
    changedAt?: DateTimeFilter<"EditHistory"> | Date | string
  }

  export type UserCreateWithoutIdentitiesInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    magicLinkTokens?: MagicLinkTokenCreateNestedManyWithoutUserInput
    logs?: LogCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    weightHistory?: UserWeightHistoryCreateNestedManyWithoutUserInput
    editHistory?: EditHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutIdentitiesInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    magicLinkTokens?: MagicLinkTokenUncheckedCreateNestedManyWithoutUserInput
    logs?: LogUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    weightHistory?: UserWeightHistoryUncheckedCreateNestedManyWithoutUserInput
    editHistory?: EditHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutIdentitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
  }

  export type UserUpsertWithoutIdentitiesInput = {
    update: XOR<UserUpdateWithoutIdentitiesInput, UserUncheckedUpdateWithoutIdentitiesInput>
    create: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutIdentitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutIdentitiesInput, UserUncheckedUpdateWithoutIdentitiesInput>
  }

  export type UserUpdateWithoutIdentitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    magicLinkTokens?: MagicLinkTokenUpdateManyWithoutUserNestedInput
    logs?: LogUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    weightHistory?: UserWeightHistoryUpdateManyWithoutUserNestedInput
    editHistory?: EditHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutIdentitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    magicLinkTokens?: MagicLinkTokenUncheckedUpdateManyWithoutUserNestedInput
    logs?: LogUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    weightHistory?: UserWeightHistoryUncheckedUpdateManyWithoutUserNestedInput
    editHistory?: EditHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutMagicLinkTokensInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    identities?: UserIdentityCreateNestedManyWithoutUserInput
    logs?: LogCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    weightHistory?: UserWeightHistoryCreateNestedManyWithoutUserInput
    editHistory?: EditHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMagicLinkTokensInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    identities?: UserIdentityUncheckedCreateNestedManyWithoutUserInput
    logs?: LogUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    weightHistory?: UserWeightHistoryUncheckedCreateNestedManyWithoutUserInput
    editHistory?: EditHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMagicLinkTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMagicLinkTokensInput, UserUncheckedCreateWithoutMagicLinkTokensInput>
  }

  export type UserUpsertWithoutMagicLinkTokensInput = {
    update: XOR<UserUpdateWithoutMagicLinkTokensInput, UserUncheckedUpdateWithoutMagicLinkTokensInput>
    create: XOR<UserCreateWithoutMagicLinkTokensInput, UserUncheckedCreateWithoutMagicLinkTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMagicLinkTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMagicLinkTokensInput, UserUncheckedUpdateWithoutMagicLinkTokensInput>
  }

  export type UserUpdateWithoutMagicLinkTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: UserIdentityUpdateManyWithoutUserNestedInput
    logs?: LogUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    weightHistory?: UserWeightHistoryUpdateManyWithoutUserNestedInput
    editHistory?: EditHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMagicLinkTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: UserIdentityUncheckedUpdateManyWithoutUserNestedInput
    logs?: LogUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    weightHistory?: UserWeightHistoryUncheckedUpdateManyWithoutUserNestedInput
    editHistory?: EditHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutLogsInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    identities?: UserIdentityCreateNestedManyWithoutUserInput
    magicLinkTokens?: MagicLinkTokenCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    weightHistory?: UserWeightHistoryCreateNestedManyWithoutUserInput
    editHistory?: EditHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLogsInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    identities?: UserIdentityUncheckedCreateNestedManyWithoutUserInput
    magicLinkTokens?: MagicLinkTokenUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    weightHistory?: UserWeightHistoryUncheckedCreateNestedManyWithoutUserInput
    editHistory?: EditHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLogsInput, UserUncheckedCreateWithoutLogsInput>
  }

  export type MealCreateWithoutSourceLogInput = {
    id?: string
    occasion?: string | null
    consumedAt: Date | string
    createdAt?: Date | string
    totalCalories?: number | null
    totalProteinG?: number | null
    totalCarbsG?: number | null
    totalFatG?: number | null
    user: UserCreateNestedOneWithoutMealsInput
    items?: MealItemCreateNestedManyWithoutMealInput
    editHistory?: EditHistoryCreateNestedManyWithoutMealInput
  }

  export type MealUncheckedCreateWithoutSourceLogInput = {
    id?: string
    userId: string
    occasion?: string | null
    consumedAt: Date | string
    createdAt?: Date | string
    totalCalories?: number | null
    totalProteinG?: number | null
    totalCarbsG?: number | null
    totalFatG?: number | null
    items?: MealItemUncheckedCreateNestedManyWithoutMealInput
    editHistory?: EditHistoryUncheckedCreateNestedManyWithoutMealInput
  }

  export type MealCreateOrConnectWithoutSourceLogInput = {
    where: MealWhereUniqueInput
    create: XOR<MealCreateWithoutSourceLogInput, MealUncheckedCreateWithoutSourceLogInput>
  }

  export type MealCreateManySourceLogInputEnvelope = {
    data: MealCreateManySourceLogInput | MealCreateManySourceLogInput[]
    skipDuplicates?: boolean
  }

  export type EditHistoryCreateWithoutSourceLogInput = {
    id?: string
    editType: string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: Date | string
    user: UserCreateNestedOneWithoutEditHistoryInput
    meal: MealCreateNestedOneWithoutEditHistoryInput
  }

  export type EditHistoryUncheckedCreateWithoutSourceLogInput = {
    id?: string
    userId: string
    mealId: string
    editType: string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: Date | string
  }

  export type EditHistoryCreateOrConnectWithoutSourceLogInput = {
    where: EditHistoryWhereUniqueInput
    create: XOR<EditHistoryCreateWithoutSourceLogInput, EditHistoryUncheckedCreateWithoutSourceLogInput>
  }

  export type EditHistoryCreateManySourceLogInputEnvelope = {
    data: EditHistoryCreateManySourceLogInput | EditHistoryCreateManySourceLogInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutLogsInput = {
    update: XOR<UserUpdateWithoutLogsInput, UserUncheckedUpdateWithoutLogsInput>
    create: XOR<UserCreateWithoutLogsInput, UserUncheckedCreateWithoutLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLogsInput, UserUncheckedUpdateWithoutLogsInput>
  }

  export type UserUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: UserIdentityUpdateManyWithoutUserNestedInput
    magicLinkTokens?: MagicLinkTokenUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    weightHistory?: UserWeightHistoryUpdateManyWithoutUserNestedInput
    editHistory?: EditHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: UserIdentityUncheckedUpdateManyWithoutUserNestedInput
    magicLinkTokens?: MagicLinkTokenUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    weightHistory?: UserWeightHistoryUncheckedUpdateManyWithoutUserNestedInput
    editHistory?: EditHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MealUpsertWithWhereUniqueWithoutSourceLogInput = {
    where: MealWhereUniqueInput
    update: XOR<MealUpdateWithoutSourceLogInput, MealUncheckedUpdateWithoutSourceLogInput>
    create: XOR<MealCreateWithoutSourceLogInput, MealUncheckedCreateWithoutSourceLogInput>
  }

  export type MealUpdateWithWhereUniqueWithoutSourceLogInput = {
    where: MealWhereUniqueInput
    data: XOR<MealUpdateWithoutSourceLogInput, MealUncheckedUpdateWithoutSourceLogInput>
  }

  export type MealUpdateManyWithWhereWithoutSourceLogInput = {
    where: MealScalarWhereInput
    data: XOR<MealUpdateManyMutationInput, MealUncheckedUpdateManyWithoutSourceLogInput>
  }

  export type EditHistoryUpsertWithWhereUniqueWithoutSourceLogInput = {
    where: EditHistoryWhereUniqueInput
    update: XOR<EditHistoryUpdateWithoutSourceLogInput, EditHistoryUncheckedUpdateWithoutSourceLogInput>
    create: XOR<EditHistoryCreateWithoutSourceLogInput, EditHistoryUncheckedCreateWithoutSourceLogInput>
  }

  export type EditHistoryUpdateWithWhereUniqueWithoutSourceLogInput = {
    where: EditHistoryWhereUniqueInput
    data: XOR<EditHistoryUpdateWithoutSourceLogInput, EditHistoryUncheckedUpdateWithoutSourceLogInput>
  }

  export type EditHistoryUpdateManyWithWhereWithoutSourceLogInput = {
    where: EditHistoryScalarWhereInput
    data: XOR<EditHistoryUpdateManyMutationInput, EditHistoryUncheckedUpdateManyWithoutSourceLogInput>
  }

  export type UserCreateWithoutMealsInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    identities?: UserIdentityCreateNestedManyWithoutUserInput
    magicLinkTokens?: MagicLinkTokenCreateNestedManyWithoutUserInput
    logs?: LogCreateNestedManyWithoutUserInput
    weightHistory?: UserWeightHistoryCreateNestedManyWithoutUserInput
    editHistory?: EditHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMealsInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    identities?: UserIdentityUncheckedCreateNestedManyWithoutUserInput
    magicLinkTokens?: MagicLinkTokenUncheckedCreateNestedManyWithoutUserInput
    logs?: LogUncheckedCreateNestedManyWithoutUserInput
    weightHistory?: UserWeightHistoryUncheckedCreateNestedManyWithoutUserInput
    editHistory?: EditHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMealsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMealsInput, UserUncheckedCreateWithoutMealsInput>
  }

  export type LogCreateWithoutMealsInput = {
    id?: string
    platform: string
    platformMessageId?: string | null
    messageTimestamp?: Date | string | null
    rawText: string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: string | null
    processingStatus: string
    clarificationPrompt?: string | null
    clarificationResponse?: string | null
    latencyMs?: number | null
    errorCode?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLogsInput
    editHistory?: EditHistoryCreateNestedManyWithoutSourceLogInput
  }

  export type LogUncheckedCreateWithoutMealsInput = {
    id?: string
    userId: string
    platform: string
    platformMessageId?: string | null
    messageTimestamp?: Date | string | null
    rawText: string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: string | null
    processingStatus: string
    clarificationPrompt?: string | null
    clarificationResponse?: string | null
    latencyMs?: number | null
    errorCode?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    editHistory?: EditHistoryUncheckedCreateNestedManyWithoutSourceLogInput
  }

  export type LogCreateOrConnectWithoutMealsInput = {
    where: LogWhereUniqueInput
    create: XOR<LogCreateWithoutMealsInput, LogUncheckedCreateWithoutMealsInput>
  }

  export type MealItemCreateWithoutMealInput = {
    id?: string
    foodName: string
    quantity: number
    unit: string
    weightG?: number | null
    calories?: number | null
    proteinG?: number | null
    carbsG?: number | null
    fatG?: number | null
    nutritionApi?: string | null
    apiRefId?: string | null
    apiResponseSnapshot?: NullableJsonNullValueInput | InputJsonValue
    resolutionConfidence?: string | null
    notes?: string | null
  }

  export type MealItemUncheckedCreateWithoutMealInput = {
    id?: string
    foodName: string
    quantity: number
    unit: string
    weightG?: number | null
    calories?: number | null
    proteinG?: number | null
    carbsG?: number | null
    fatG?: number | null
    nutritionApi?: string | null
    apiRefId?: string | null
    apiResponseSnapshot?: NullableJsonNullValueInput | InputJsonValue
    resolutionConfidence?: string | null
    notes?: string | null
  }

  export type MealItemCreateOrConnectWithoutMealInput = {
    where: MealItemWhereUniqueInput
    create: XOR<MealItemCreateWithoutMealInput, MealItemUncheckedCreateWithoutMealInput>
  }

  export type MealItemCreateManyMealInputEnvelope = {
    data: MealItemCreateManyMealInput | MealItemCreateManyMealInput[]
    skipDuplicates?: boolean
  }

  export type EditHistoryCreateWithoutMealInput = {
    id?: string
    editType: string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: Date | string
    user: UserCreateNestedOneWithoutEditHistoryInput
    sourceLog?: LogCreateNestedOneWithoutEditHistoryInput
  }

  export type EditHistoryUncheckedCreateWithoutMealInput = {
    id?: string
    userId: string
    sourceLogId?: string | null
    editType: string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: Date | string
  }

  export type EditHistoryCreateOrConnectWithoutMealInput = {
    where: EditHistoryWhereUniqueInput
    create: XOR<EditHistoryCreateWithoutMealInput, EditHistoryUncheckedCreateWithoutMealInput>
  }

  export type EditHistoryCreateManyMealInputEnvelope = {
    data: EditHistoryCreateManyMealInput | EditHistoryCreateManyMealInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMealsInput = {
    update: XOR<UserUpdateWithoutMealsInput, UserUncheckedUpdateWithoutMealsInput>
    create: XOR<UserCreateWithoutMealsInput, UserUncheckedCreateWithoutMealsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMealsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMealsInput, UserUncheckedUpdateWithoutMealsInput>
  }

  export type UserUpdateWithoutMealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: UserIdentityUpdateManyWithoutUserNestedInput
    magicLinkTokens?: MagicLinkTokenUpdateManyWithoutUserNestedInput
    logs?: LogUpdateManyWithoutUserNestedInput
    weightHistory?: UserWeightHistoryUpdateManyWithoutUserNestedInput
    editHistory?: EditHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: UserIdentityUncheckedUpdateManyWithoutUserNestedInput
    magicLinkTokens?: MagicLinkTokenUncheckedUpdateManyWithoutUserNestedInput
    logs?: LogUncheckedUpdateManyWithoutUserNestedInput
    weightHistory?: UserWeightHistoryUncheckedUpdateManyWithoutUserNestedInput
    editHistory?: EditHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LogUpsertWithoutMealsInput = {
    update: XOR<LogUpdateWithoutMealsInput, LogUncheckedUpdateWithoutMealsInput>
    create: XOR<LogCreateWithoutMealsInput, LogUncheckedCreateWithoutMealsInput>
    where?: LogWhereInput
  }

  export type LogUpdateToOneWithWhereWithoutMealsInput = {
    where?: LogWhereInput
    data: XOR<LogUpdateWithoutMealsInput, LogUncheckedUpdateWithoutMealsInput>
  }

  export type LogUpdateWithoutMealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    messageTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawText?: StringFieldUpdateOperationsInput | string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: StringFieldUpdateOperationsInput | string
    clarificationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    clarificationResponse?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLogsNestedInput
    editHistory?: EditHistoryUpdateManyWithoutSourceLogNestedInput
  }

  export type LogUncheckedUpdateWithoutMealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    messageTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawText?: StringFieldUpdateOperationsInput | string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: StringFieldUpdateOperationsInput | string
    clarificationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    clarificationResponse?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editHistory?: EditHistoryUncheckedUpdateManyWithoutSourceLogNestedInput
  }

  export type MealItemUpsertWithWhereUniqueWithoutMealInput = {
    where: MealItemWhereUniqueInput
    update: XOR<MealItemUpdateWithoutMealInput, MealItemUncheckedUpdateWithoutMealInput>
    create: XOR<MealItemCreateWithoutMealInput, MealItemUncheckedCreateWithoutMealInput>
  }

  export type MealItemUpdateWithWhereUniqueWithoutMealInput = {
    where: MealItemWhereUniqueInput
    data: XOR<MealItemUpdateWithoutMealInput, MealItemUncheckedUpdateWithoutMealInput>
  }

  export type MealItemUpdateManyWithWhereWithoutMealInput = {
    where: MealItemScalarWhereInput
    data: XOR<MealItemUpdateManyMutationInput, MealItemUncheckedUpdateManyWithoutMealInput>
  }

  export type MealItemScalarWhereInput = {
    AND?: MealItemScalarWhereInput | MealItemScalarWhereInput[]
    OR?: MealItemScalarWhereInput[]
    NOT?: MealItemScalarWhereInput | MealItemScalarWhereInput[]
    id?: StringFilter<"MealItem"> | string
    mealId?: StringFilter<"MealItem"> | string
    foodName?: StringFilter<"MealItem"> | string
    quantity?: FloatFilter<"MealItem"> | number
    unit?: StringFilter<"MealItem"> | string
    weightG?: FloatNullableFilter<"MealItem"> | number | null
    calories?: IntNullableFilter<"MealItem"> | number | null
    proteinG?: FloatNullableFilter<"MealItem"> | number | null
    carbsG?: FloatNullableFilter<"MealItem"> | number | null
    fatG?: FloatNullableFilter<"MealItem"> | number | null
    nutritionApi?: StringNullableFilter<"MealItem"> | string | null
    apiRefId?: StringNullableFilter<"MealItem"> | string | null
    apiResponseSnapshot?: JsonNullableFilter<"MealItem">
    resolutionConfidence?: StringNullableFilter<"MealItem"> | string | null
    notes?: StringNullableFilter<"MealItem"> | string | null
  }

  export type EditHistoryUpsertWithWhereUniqueWithoutMealInput = {
    where: EditHistoryWhereUniqueInput
    update: XOR<EditHistoryUpdateWithoutMealInput, EditHistoryUncheckedUpdateWithoutMealInput>
    create: XOR<EditHistoryCreateWithoutMealInput, EditHistoryUncheckedCreateWithoutMealInput>
  }

  export type EditHistoryUpdateWithWhereUniqueWithoutMealInput = {
    where: EditHistoryWhereUniqueInput
    data: XOR<EditHistoryUpdateWithoutMealInput, EditHistoryUncheckedUpdateWithoutMealInput>
  }

  export type EditHistoryUpdateManyWithWhereWithoutMealInput = {
    where: EditHistoryScalarWhereInput
    data: XOR<EditHistoryUpdateManyMutationInput, EditHistoryUncheckedUpdateManyWithoutMealInput>
  }

  export type MealCreateWithoutItemsInput = {
    id?: string
    occasion?: string | null
    consumedAt: Date | string
    createdAt?: Date | string
    totalCalories?: number | null
    totalProteinG?: number | null
    totalCarbsG?: number | null
    totalFatG?: number | null
    user: UserCreateNestedOneWithoutMealsInput
    sourceLog?: LogCreateNestedOneWithoutMealsInput
    editHistory?: EditHistoryCreateNestedManyWithoutMealInput
  }

  export type MealUncheckedCreateWithoutItemsInput = {
    id?: string
    userId: string
    sourceLogId?: string | null
    occasion?: string | null
    consumedAt: Date | string
    createdAt?: Date | string
    totalCalories?: number | null
    totalProteinG?: number | null
    totalCarbsG?: number | null
    totalFatG?: number | null
    editHistory?: EditHistoryUncheckedCreateNestedManyWithoutMealInput
  }

  export type MealCreateOrConnectWithoutItemsInput = {
    where: MealWhereUniqueInput
    create: XOR<MealCreateWithoutItemsInput, MealUncheckedCreateWithoutItemsInput>
  }

  export type MealUpsertWithoutItemsInput = {
    update: XOR<MealUpdateWithoutItemsInput, MealUncheckedUpdateWithoutItemsInput>
    create: XOR<MealCreateWithoutItemsInput, MealUncheckedCreateWithoutItemsInput>
    where?: MealWhereInput
  }

  export type MealUpdateToOneWithWhereWithoutItemsInput = {
    where?: MealWhereInput
    data: XOR<MealUpdateWithoutItemsInput, MealUncheckedUpdateWithoutItemsInput>
  }

  export type MealUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutMealsNestedInput
    sourceLog?: LogUpdateOneWithoutMealsNestedInput
    editHistory?: EditHistoryUpdateManyWithoutMealNestedInput
  }

  export type MealUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceLogId?: NullableStringFieldUpdateOperationsInput | string | null
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
    editHistory?: EditHistoryUncheckedUpdateManyWithoutMealNestedInput
  }

  export type UserCreateWithoutWeightHistoryInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    identities?: UserIdentityCreateNestedManyWithoutUserInput
    magicLinkTokens?: MagicLinkTokenCreateNestedManyWithoutUserInput
    logs?: LogCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    editHistory?: EditHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWeightHistoryInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    identities?: UserIdentityUncheckedCreateNestedManyWithoutUserInput
    magicLinkTokens?: MagicLinkTokenUncheckedCreateNestedManyWithoutUserInput
    logs?: LogUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    editHistory?: EditHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWeightHistoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWeightHistoryInput, UserUncheckedCreateWithoutWeightHistoryInput>
  }

  export type UserUpsertWithoutWeightHistoryInput = {
    update: XOR<UserUpdateWithoutWeightHistoryInput, UserUncheckedUpdateWithoutWeightHistoryInput>
    create: XOR<UserCreateWithoutWeightHistoryInput, UserUncheckedCreateWithoutWeightHistoryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWeightHistoryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWeightHistoryInput, UserUncheckedUpdateWithoutWeightHistoryInput>
  }

  export type UserUpdateWithoutWeightHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: UserIdentityUpdateManyWithoutUserNestedInput
    magicLinkTokens?: MagicLinkTokenUpdateManyWithoutUserNestedInput
    logs?: LogUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    editHistory?: EditHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWeightHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: UserIdentityUncheckedUpdateManyWithoutUserNestedInput
    magicLinkTokens?: MagicLinkTokenUncheckedUpdateManyWithoutUserNestedInput
    logs?: LogUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    editHistory?: EditHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutEditHistoryInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    identities?: UserIdentityCreateNestedManyWithoutUserInput
    magicLinkTokens?: MagicLinkTokenCreateNestedManyWithoutUserInput
    logs?: LogCreateNestedManyWithoutUserInput
    meals?: MealCreateNestedManyWithoutUserInput
    weightHistory?: UserWeightHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEditHistoryInput = {
    id?: string
    email: string
    passwordHash: string
    dailyCalorieGoal?: number | null
    weightKg?: number | null
    heightCm?: number | null
    age?: number | null
    sex?: string | null
    activityLevel?: string | null
    createdAt?: Date | string
    identities?: UserIdentityUncheckedCreateNestedManyWithoutUserInput
    magicLinkTokens?: MagicLinkTokenUncheckedCreateNestedManyWithoutUserInput
    logs?: LogUncheckedCreateNestedManyWithoutUserInput
    meals?: MealUncheckedCreateNestedManyWithoutUserInput
    weightHistory?: UserWeightHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEditHistoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEditHistoryInput, UserUncheckedCreateWithoutEditHistoryInput>
  }

  export type MealCreateWithoutEditHistoryInput = {
    id?: string
    occasion?: string | null
    consumedAt: Date | string
    createdAt?: Date | string
    totalCalories?: number | null
    totalProteinG?: number | null
    totalCarbsG?: number | null
    totalFatG?: number | null
    user: UserCreateNestedOneWithoutMealsInput
    sourceLog?: LogCreateNestedOneWithoutMealsInput
    items?: MealItemCreateNestedManyWithoutMealInput
  }

  export type MealUncheckedCreateWithoutEditHistoryInput = {
    id?: string
    userId: string
    sourceLogId?: string | null
    occasion?: string | null
    consumedAt: Date | string
    createdAt?: Date | string
    totalCalories?: number | null
    totalProteinG?: number | null
    totalCarbsG?: number | null
    totalFatG?: number | null
    items?: MealItemUncheckedCreateNestedManyWithoutMealInput
  }

  export type MealCreateOrConnectWithoutEditHistoryInput = {
    where: MealWhereUniqueInput
    create: XOR<MealCreateWithoutEditHistoryInput, MealUncheckedCreateWithoutEditHistoryInput>
  }

  export type LogCreateWithoutEditHistoryInput = {
    id?: string
    platform: string
    platformMessageId?: string | null
    messageTimestamp?: Date | string | null
    rawText: string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: string | null
    processingStatus: string
    clarificationPrompt?: string | null
    clarificationResponse?: string | null
    latencyMs?: number | null
    errorCode?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLogsInput
    meals?: MealCreateNestedManyWithoutSourceLogInput
  }

  export type LogUncheckedCreateWithoutEditHistoryInput = {
    id?: string
    userId: string
    platform: string
    platformMessageId?: string | null
    messageTimestamp?: Date | string | null
    rawText: string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: string | null
    processingStatus: string
    clarificationPrompt?: string | null
    clarificationResponse?: string | null
    latencyMs?: number | null
    errorCode?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    meals?: MealUncheckedCreateNestedManyWithoutSourceLogInput
  }

  export type LogCreateOrConnectWithoutEditHistoryInput = {
    where: LogWhereUniqueInput
    create: XOR<LogCreateWithoutEditHistoryInput, LogUncheckedCreateWithoutEditHistoryInput>
  }

  export type UserUpsertWithoutEditHistoryInput = {
    update: XOR<UserUpdateWithoutEditHistoryInput, UserUncheckedUpdateWithoutEditHistoryInput>
    create: XOR<UserCreateWithoutEditHistoryInput, UserUncheckedCreateWithoutEditHistoryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEditHistoryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEditHistoryInput, UserUncheckedUpdateWithoutEditHistoryInput>
  }

  export type UserUpdateWithoutEditHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: UserIdentityUpdateManyWithoutUserNestedInput
    magicLinkTokens?: MagicLinkTokenUpdateManyWithoutUserNestedInput
    logs?: LogUpdateManyWithoutUserNestedInput
    meals?: MealUpdateManyWithoutUserNestedInput
    weightHistory?: UserWeightHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEditHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    dailyCalorieGoal?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: UserIdentityUncheckedUpdateManyWithoutUserNestedInput
    magicLinkTokens?: MagicLinkTokenUncheckedUpdateManyWithoutUserNestedInput
    logs?: LogUncheckedUpdateManyWithoutUserNestedInput
    meals?: MealUncheckedUpdateManyWithoutUserNestedInput
    weightHistory?: UserWeightHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MealUpsertWithoutEditHistoryInput = {
    update: XOR<MealUpdateWithoutEditHistoryInput, MealUncheckedUpdateWithoutEditHistoryInput>
    create: XOR<MealCreateWithoutEditHistoryInput, MealUncheckedCreateWithoutEditHistoryInput>
    where?: MealWhereInput
  }

  export type MealUpdateToOneWithWhereWithoutEditHistoryInput = {
    where?: MealWhereInput
    data: XOR<MealUpdateWithoutEditHistoryInput, MealUncheckedUpdateWithoutEditHistoryInput>
  }

  export type MealUpdateWithoutEditHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutMealsNestedInput
    sourceLog?: LogUpdateOneWithoutMealsNestedInput
    items?: MealItemUpdateManyWithoutMealNestedInput
  }

  export type MealUncheckedUpdateWithoutEditHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceLogId?: NullableStringFieldUpdateOperationsInput | string | null
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
    items?: MealItemUncheckedUpdateManyWithoutMealNestedInput
  }

  export type LogUpsertWithoutEditHistoryInput = {
    update: XOR<LogUpdateWithoutEditHistoryInput, LogUncheckedUpdateWithoutEditHistoryInput>
    create: XOR<LogCreateWithoutEditHistoryInput, LogUncheckedCreateWithoutEditHistoryInput>
    where?: LogWhereInput
  }

  export type LogUpdateToOneWithWhereWithoutEditHistoryInput = {
    where?: LogWhereInput
    data: XOR<LogUpdateWithoutEditHistoryInput, LogUncheckedUpdateWithoutEditHistoryInput>
  }

  export type LogUpdateWithoutEditHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    messageTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawText?: StringFieldUpdateOperationsInput | string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: StringFieldUpdateOperationsInput | string
    clarificationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    clarificationResponse?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLogsNestedInput
    meals?: MealUpdateManyWithoutSourceLogNestedInput
  }

  export type LogUncheckedUpdateWithoutEditHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    messageTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawText?: StringFieldUpdateOperationsInput | string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: StringFieldUpdateOperationsInput | string
    clarificationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    clarificationResponse?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meals?: MealUncheckedUpdateManyWithoutSourceLogNestedInput
  }

  export type UserIdentityCreateManyUserInput = {
    id?: string
    platform: string
    platformUserId: string
    linkedAt?: Date | string
    lastSeenAt?: Date | string | null
    isPrimary?: boolean
  }

  export type MagicLinkTokenCreateManyUserInput = {
    id?: string
    platform: string
    token: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    redirectUrl?: string | null
  }

  export type LogCreateManyUserInput = {
    id?: string
    platform: string
    platformMessageId?: string | null
    messageTimestamp?: Date | string | null
    rawText: string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: string | null
    processingStatus: string
    clarificationPrompt?: string | null
    clarificationResponse?: string | null
    latencyMs?: number | null
    errorCode?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type MealCreateManyUserInput = {
    id?: string
    sourceLogId?: string | null
    occasion?: string | null
    consumedAt: Date | string
    createdAt?: Date | string
    totalCalories?: number | null
    totalProteinG?: number | null
    totalCarbsG?: number | null
    totalFatG?: number | null
  }

  export type UserWeightHistoryCreateManyUserInput = {
    id?: string
    weightKg: number
    recordedAt?: Date | string
    source?: string | null
  }

  export type EditHistoryCreateManyUserInput = {
    id?: string
    mealId: string
    sourceLogId?: string | null
    editType: string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: Date | string
  }

  export type UserIdentityUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformUserId?: StringFieldUpdateOperationsInput | string
    linkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserIdentityUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformUserId?: StringFieldUpdateOperationsInput | string
    linkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserIdentityUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformUserId?: StringFieldUpdateOperationsInput | string
    linkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MagicLinkTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redirectUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MagicLinkTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redirectUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MagicLinkTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redirectUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    messageTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawText?: StringFieldUpdateOperationsInput | string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: StringFieldUpdateOperationsInput | string
    clarificationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    clarificationResponse?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meals?: MealUpdateManyWithoutSourceLogNestedInput
    editHistory?: EditHistoryUpdateManyWithoutSourceLogNestedInput
  }

  export type LogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    messageTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawText?: StringFieldUpdateOperationsInput | string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: StringFieldUpdateOperationsInput | string
    clarificationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    clarificationResponse?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meals?: MealUncheckedUpdateManyWithoutSourceLogNestedInput
    editHistory?: EditHistoryUncheckedUpdateManyWithoutSourceLogNestedInput
  }

  export type LogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    platformMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    messageTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawText?: StringFieldUpdateOperationsInput | string
    llmOutput?: NullableJsonNullValueInput | InputJsonValue
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: StringFieldUpdateOperationsInput | string
    clarificationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    clarificationResponse?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
    sourceLog?: LogUpdateOneWithoutMealsNestedInput
    items?: MealItemUpdateManyWithoutMealNestedInput
    editHistory?: EditHistoryUpdateManyWithoutMealNestedInput
  }

  export type MealUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceLogId?: NullableStringFieldUpdateOperationsInput | string | null
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
    items?: MealItemUncheckedUpdateManyWithoutMealNestedInput
    editHistory?: EditHistoryUncheckedUpdateManyWithoutMealNestedInput
  }

  export type MealUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceLogId?: NullableStringFieldUpdateOperationsInput | string | null
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type UserWeightHistoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserWeightHistoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserWeightHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    weightKg?: FloatFieldUpdateOperationsInput | number
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EditHistoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    editType?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meal?: MealUpdateOneRequiredWithoutEditHistoryNestedInput
    sourceLog?: LogUpdateOneWithoutEditHistoryNestedInput
  }

  export type EditHistoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealId?: StringFieldUpdateOperationsInput | string
    sourceLogId?: NullableStringFieldUpdateOperationsInput | string | null
    editType?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EditHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealId?: StringFieldUpdateOperationsInput | string
    sourceLogId?: NullableStringFieldUpdateOperationsInput | string | null
    editType?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealCreateManySourceLogInput = {
    id?: string
    userId: string
    occasion?: string | null
    consumedAt: Date | string
    createdAt?: Date | string
    totalCalories?: number | null
    totalProteinG?: number | null
    totalCarbsG?: number | null
    totalFatG?: number | null
  }

  export type EditHistoryCreateManySourceLogInput = {
    id?: string
    userId: string
    mealId: string
    editType: string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: Date | string
  }

  export type MealUpdateWithoutSourceLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutMealsNestedInput
    items?: MealItemUpdateManyWithoutMealNestedInput
    editHistory?: EditHistoryUpdateManyWithoutMealNestedInput
  }

  export type MealUncheckedUpdateWithoutSourceLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
    items?: MealItemUncheckedUpdateManyWithoutMealNestedInput
    editHistory?: EditHistoryUncheckedUpdateManyWithoutMealNestedInput
  }

  export type MealUncheckedUpdateManyWithoutSourceLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    occasion?: NullableStringFieldUpdateOperationsInput | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCalories?: NullableIntFieldUpdateOperationsInput | number | null
    totalProteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCarbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    totalFatG?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type EditHistoryUpdateWithoutSourceLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    editType?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEditHistoryNestedInput
    meal?: MealUpdateOneRequiredWithoutEditHistoryNestedInput
  }

  export type EditHistoryUncheckedUpdateWithoutSourceLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mealId?: StringFieldUpdateOperationsInput | string
    editType?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EditHistoryUncheckedUpdateManyWithoutSourceLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mealId?: StringFieldUpdateOperationsInput | string
    editType?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealItemCreateManyMealInput = {
    id?: string
    foodName: string
    quantity: number
    unit: string
    weightG?: number | null
    calories?: number | null
    proteinG?: number | null
    carbsG?: number | null
    fatG?: number | null
    nutritionApi?: string | null
    apiRefId?: string | null
    apiResponseSnapshot?: NullableJsonNullValueInput | InputJsonValue
    resolutionConfidence?: string | null
    notes?: string | null
  }

  export type EditHistoryCreateManyMealInput = {
    id?: string
    userId: string
    sourceLogId?: string | null
    editType: string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: Date | string
  }

  export type MealItemUpdateWithoutMealInput = {
    id?: StringFieldUpdateOperationsInput | string
    foodName?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    weightG?: NullableFloatFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    proteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    carbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    fatG?: NullableFloatFieldUpdateOperationsInput | number | null
    nutritionApi?: NullableStringFieldUpdateOperationsInput | string | null
    apiRefId?: NullableStringFieldUpdateOperationsInput | string | null
    apiResponseSnapshot?: NullableJsonNullValueInput | InputJsonValue
    resolutionConfidence?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MealItemUncheckedUpdateWithoutMealInput = {
    id?: StringFieldUpdateOperationsInput | string
    foodName?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    weightG?: NullableFloatFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    proteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    carbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    fatG?: NullableFloatFieldUpdateOperationsInput | number | null
    nutritionApi?: NullableStringFieldUpdateOperationsInput | string | null
    apiRefId?: NullableStringFieldUpdateOperationsInput | string | null
    apiResponseSnapshot?: NullableJsonNullValueInput | InputJsonValue
    resolutionConfidence?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MealItemUncheckedUpdateManyWithoutMealInput = {
    id?: StringFieldUpdateOperationsInput | string
    foodName?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    weightG?: NullableFloatFieldUpdateOperationsInput | number | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    proteinG?: NullableFloatFieldUpdateOperationsInput | number | null
    carbsG?: NullableFloatFieldUpdateOperationsInput | number | null
    fatG?: NullableFloatFieldUpdateOperationsInput | number | null
    nutritionApi?: NullableStringFieldUpdateOperationsInput | string | null
    apiRefId?: NullableStringFieldUpdateOperationsInput | string | null
    apiResponseSnapshot?: NullableJsonNullValueInput | InputJsonValue
    resolutionConfidence?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EditHistoryUpdateWithoutMealInput = {
    id?: StringFieldUpdateOperationsInput | string
    editType?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEditHistoryNestedInput
    sourceLog?: LogUpdateOneWithoutEditHistoryNestedInput
  }

  export type EditHistoryUncheckedUpdateWithoutMealInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceLogId?: NullableStringFieldUpdateOperationsInput | string | null
    editType?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EditHistoryUncheckedUpdateManyWithoutMealInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceLogId?: NullableStringFieldUpdateOperationsInput | string | null
    editType?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LogCountOutputTypeDefaultArgs instead
     */
    export type LogCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LogCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MealCountOutputTypeDefaultArgs instead
     */
    export type MealCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MealCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserIdentityDefaultArgs instead
     */
    export type UserIdentityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserIdentityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MagicLinkTokenDefaultArgs instead
     */
    export type MagicLinkTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MagicLinkTokenDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LogDefaultArgs instead
     */
    export type LogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MealDefaultArgs instead
     */
    export type MealArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MealDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MealItemDefaultArgs instead
     */
    export type MealItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MealItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ApiCacheDefaultArgs instead
     */
    export type ApiCacheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ApiCacheDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserWeightHistoryDefaultArgs instead
     */
    export type UserWeightHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserWeightHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EditHistoryDefaultArgs instead
     */
    export type EditHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EditHistoryDefaultArgs<ExtArgs>

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