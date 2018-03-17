let DBModel = require("./db-model");
let dbModel = new DBModel();

function saveProject(project){
    return dbModel.Project.create(project)
}
function saveUser(user){
    return dbModel.User.create(user)
}

async function saveProjectAndUser(project,user){
    let saveProject = await dbModel.Project.create(project);
    let saveUser = await dbModel.User.create(user);
}

async function addProjectFromUser(user_id,project_id){
    let getUser = await dbModel.User.findById(user_id)
    let getProject = await dbModel.Project.findById(project_id)
    
    getUser.addProject(getProject)
}
async function addUserFromProject(user_id,project_id){
    let getUser = await dbModel.User.findById(user_id)
    let getProject = await dbModel.Project.findById(project_id)

    getProject.addUser(getUser)
}

async function removeUserFromProject(user_id,project_id){
    let getUser = await dbModel.User.findById(user_id)
    let getProject = await dbModel.Project.findById(project_id)

    getProject.removeUser(getUser);
}

dbModel.syncAllTables(true).then(val=>{
    console.log(val);
}).catch(err=>{
    console.error(err);
})

// removeUserFromProject("U005",2).then(()=>{
//     console.log("remove user from project done ");
// },(err)=>{
//     console.error(err);
// })

// addProjectToUser("U005",).then(()=>{
//     console.log("ADD PROJECT TO USER DONE")
// },(err)=>{
//     console.log(err);
// });

// dbModel.Project.findById(2)
//     .then(project=>{
//         return project.getUsers()
//     })
//     .then(projectUser=>{
//         console.log(JSON.stringify(projectUser));
//     })
//     .catch(err=>{
//         console.error(err);
//     })

