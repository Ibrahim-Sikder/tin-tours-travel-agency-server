import { Query } from "mongoose";
import { TQueryObj } from "../types/TQueryObj";
import { filter } from "./filterHelper";
import { search } from "./searchHelper";
import { sort } from "./sortHelper";
import { paginate } from "./paginateHelper";
import { field } from "./fieldHelper";

export const getQuery = <T>(modelQuery:Query<T[], T>, query:TQueryObj)=>{
    const filterQuery = filter(modelQuery, query)
    const searchQuery = search(filterQuery, query)
    const sortQuery = sort(searchQuery, query)
    const paginateQuery = paginate(sortQuery, query)
    const fieldQuery = field(paginateQuery, query)
  
    return fieldQuery

}