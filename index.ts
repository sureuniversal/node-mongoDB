import mongoDb, { Collection } from 'mongodb';
class MongoDbManager
{
    private static client: mongoDb.MongoClient;

    public static async init(dbServer: string)
    {
        MongoDbManager.client = await mongoDb.connect(dbServer);
    }

    public static async find(dbName: string, collectionName: string, filter: {}, project: string[] = []): Promise<any[]>
    {
        const collection = MongoDbManager.getCollection(dbName, collectionName);
        const projectFilter = project.length > 0 ? MongoDbManager.buildProjectFilter(project): {};
        const docs = await collection.find(filter, projectFilter).toArray();
        return docs;
    }

    public static async findOne(dbName: string, collectionName: string, filter: {}, project: string[] = []): Promise<{[name:string]: any}>
    {
        const collection = MongoDbManager.getCollection(dbName, collectionName); 
        const projectFilter = project.length > 0 ? MongoDbManager.buildProjectFilter(project): {};
        const docs = await collection.findOne(filter, projectFilter);
        return docs;
    }

    public static async insertMany(dbName: string, collectionName: string, insertDocs: any[]): Promise<{[name:string]: any}>
    {
        const collection = MongoDbManager.getCollection(dbName, collectionName); 
        const docs = await collection.insertMany(insertDocs);
        return docs;
    }

    public static async insert(dbName: string, collectionName: string, document: any): Promise<{[name:string]: any}>
    {
        const collection = MongoDbManager.getCollection(dbName, collectionName); 
        const docs = await collection.insert(document);
        return docs;
    }

    public static async deleteMany(dbName: string, collectionName: string, document: any)
    {
        const collection = MongoDbManager.getCollection(dbName, collectionName); 
        const docs = await collection.deleteMany(document);
        return docs;
    }

    public static async update(dbName: string, collectionName: string, filter: {}, set: {}): Promise<{[name:string]: any}>
    {
        const collection = MongoDbManager.getCollection(dbName, collectionName);
        const updateQuery: mongoDb.UpdateQuery<any> = {
            $set: set,
        };

        const updateOneOptions: mongoDb.UpdateOneOptions = {
            upsert: true
        }

        const docs = await collection.update(filter, updateQuery, updateOneOptions);
        return docs;
    }

    public static async createCollectionIfNotExists(dbName: string, collectionName: string): Promise<boolean>
    {
        let db = MongoDbManager.client.db(dbName);
        const collections = await db.collections();
        const collectionNames = collections.map(e => e.collectionName);
        if (!collectionNames.includes(collectionName)) {
            await db.createCollection(collectionName);
            return true;
        }

        return false;
    }

    public static async createIndexForCollection(dbName: string, collectionName: string, columns: {}, options?: mongoDb.IndexOptions): Promise<void>
    {
        const collection = MongoDbManager.getCollection(dbName, collectionName);
        await collection.createIndex(columns, options);
    }

    private static getCollection(dbName: string, collectionName: string): Collection
    {
        const db = MongoDbManager.client.db(dbName);
        const collection = db.collection(collectionName); 
        return collection;
    }

    private static buildProjectFilter(params: any[]): {}
    {
        let project:{[name: string]: number} = {};
        for(const entry of params)
        {
            project[entry] = 1;
        }

        const projection: mongoDb.FindOneOptions =  
        {
            projection: project
        }

        return projection;
    }

    public static buildInFilter(params: any[]): {}
    {
        return {"$in": this.buildFilter(params)};
    }

    public static buildAndFilter(params: any[]): {}
    {
        return {"$and": this.buildFilter(params)};
    }

    public static buildOrFilter(params: any[]): {}
    {
        return {"$or": this.buildFilter(params)};
    }

    private static buildFilter(params: any[]): any[]
    {
        let filters = [];
        for(const entry of params)
        {
            filters.push(entry);
        }

        return filters;
    }
}

export = MongoDbManager;