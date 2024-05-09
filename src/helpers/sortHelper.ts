import { Query } from "mongoose";
import { TQueryObj } from "../types/TQueryObj";

export const sort = <T>(modelQuery:Query<T[], T>, query:TQueryObj)=>{
    if(query.sortOrder && query.sortBy){
        const sortBy = query.sortBy
        const sortOrder = query.sortOrder
        const sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
        modelQuery.sort(sortStr)
      }
return modelQuery;

}