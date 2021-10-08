
var MongoClient = require('Mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;


module.exports = {
    processSubs: function(url, user)
    {
        async function Subscriptions(){
            let db = await MongoClient.connect(url);
            let dbo = db.db("Social_Clubs_v1");
            return await dbo.collection("Subscriptions").find({tenant_id: user.tenant_id})
            .toArray()
        }

        async function Members()
        {
            let db = await MongoClient.connect(url);
            let dbo = db.db("Social_Clubs_v1");
            return await dbo.collection("Members").find({tenant_id: user.tenant_id})
            .toArray()
        }
        
        Promise.allSettled([Subscriptions(), Members()]).then(values => {
            let subs = values[0].value
            let members = values[1].value
            for(let member of members)
            {
                //each time, let's set the members charges to 0
                member.charges = 0
                
                for(let sub of subs)
                {
                    for(let sub_member of sub.members)
                    {
                        if(member._id == sub_member._id)
                        {
                            member.charges = member.charges + Number(sub.price)
                        }
                    }
                    
                }
            }
            SaveMembers(members)

        })

        function SaveMembers(members)
        {
            MongoClient.connect(url, function(err, db){
                for(let i = 0; i < members.length; i++){
                    var dbo = db.db("Social_Clubs_v1");
                    dbo.collection('Members').updateMany({ '_id' : new ObjectId(members[i]._id)},
                    {$set : {
                        balance: members[i].charges}},
                    {upsert: true})
                }
            });
        }
    }
}
