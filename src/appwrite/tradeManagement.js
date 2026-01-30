import conf from "../conf/conf";
import {
  ID,
  Databases,
  Client,
  Storage,
  Query,
  Permission,
  Role,
} from "appwrite";

export class Trades {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async addTrade({
    userId,
    currencyPair,
    tradeDirection,
    totalConfluence,
    beforeChart,
    afterChart,
    outcome,
    tradeResult,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          userId,
          currencyPair,
          tradeDirection,
          totalConfluence: Number(totalConfluence),
          beforeChart,
          afterChart,
          outcome,
          tradeResult,
        },
        [Permission.read(Role.users()), Permission.write(Role.users())],
      );
    } catch (err) {
      throw err;
    }
  }

  async getTrades(queries) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries?.length ? queries : undefined,
      );
      return response.documents;
    } catch (err) {
      console.error("Error fetching trades:", err);
      return [];
    }
  }

  getImagePreview(fileId) {
    if (!fileId) return null;

    return this.bucket.getFileView(
      conf.appwriteBucketId,
      fileId
    )
  }

  async deleteTrade(id){
    try{
      await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, id)
      
    }catch(err){
      throw err
    }
  }

  async uploadFile(file) {
    return this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file, [
      Permission.read(Role.users()),
      Permission.write(Role.users()),
    ]);
  }
}

const trades = new Trades();

export default trades;
