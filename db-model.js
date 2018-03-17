const Sequelize = require("sequelize");
const sequelize = new Sequelize("s_orm4","arief","123",{
    dialect:"mysql",
    operatorsAliases:false
});

class DatabaseModel {
    constructor(){
        this.defineAllTables();
        this.doRelation();
    }
    syncAllTables(forceIt){
        return sequelize.sync({force : forceIt})
    }
    doRelation(){
        this.User.belongsToMany(this.Project,{
            through:"user_project",
            foreignKey:"user_id"
        });
        this.Project.belongsToMany(this.User,{
            through:"user_project",
            foreignKey:"project_id"
        });
    }
    defineAllTables(){
        this.User = sequelize.define("user",{
            user_id: {
                type:Sequelize.STRING,
                primaryKey:true,
                field:"user_id"
            },
            userName: {
                type:Sequelize.STRING,
                field:"user_name"
            }
        },{
            timestamps:false,
            tableName:"user"
        });
        
        this.Project = sequelize.define("project",{
            project_id: {
                type:Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                field:"project_id"
            },
            projectName: {
                type:Sequelize.STRING,
                unique:true,
                field:"project_name"
            }
        },{
            timestamps:false,
            tableName:"project"
        });
    }
}

module.exports = DatabaseModel