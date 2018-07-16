function identifization(cur_db, cur_coll) {
    // Initialization of relevant parameters to Mongo
    var usedDb = db.getSisterDB(cur_db);
    var field_arr = ["actors", "description", "description_foreign",
        "directors", "nations_list", "duration", "episode_type", 
        "release", "like", "platform", "slug", "status", "structure_id",
        "title", "type"];

    // Looping over the array of field, sequentially create new collection
    //      and push new items from a `main` collection to above collection
    for (var index = 0; index < field_arr.length; index++) {
        var field = field_arr[index];
        var coll_name = cur_coll.concat(".").concat(field);

        // Creating new collection
        usedDb.createCollection(coll_name);

        // Creating new query that will look for
        //      items having existing`coll-name` key
        var query = {};
        query[field] = {"$exists": true};

        // Creating query for options; permit only
        //      the fields of `field` to show up
        var query_opts = {};
        query_opts["_id"] = 0;
        query_opts[field] = 1;

        // Querying ... 
        var cur_coll_query = usedDb[cur_coll].find(query, query_opts);

        // Looping over the results returned by Mongo
        while (cur_coll_query.hasNext()) {
            // Designating the current record
            var record = cur_coll_query.next();

            // If the record's value is of Array type, iterate over its element
            //      and build queries to look for them in corresponding collect-
            //      ions
            if (record[field].constructor == Array) {
                var record_arr = record[field];
                for (var record_index = 0; record_index < record_arr.length; record_index++) {
                    var inner_query = {};
                    inner_query[field] = record_arr[record_index];

                    var inner_query_result = usedDb[coll_name].find(inner_query);

                    if (! inner_query_result.hasNext()) {
                        usedDb[coll_name].insert(inner_query);
                    }
                }
            // If the record's value is of Object type, print warning and move on
            } else if (record[field].constructor == Object) {
                print("Warning: JS Object detected");
            // Finally, if the record's value is of expected type, build queries as usual
            //      and attempt to push to corresponding collections
            } else {
                // Creating a new query
                var inner_query = {};
                inner_query[field] = record[field];

                var inner_query_result = usedDb[coll_name].find(inner_query);

                if (! inner_query_result.hasNext()) {
                    usedDb[coll_name].insert(inner_query);
                }
            }
        }

    }
}