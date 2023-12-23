import User from "../Modules/userModell.js"


// deldete user
      
      export const deleteUser = async (req, res) => {
        const userId=req.params.id;

        try {
          const deleteuser = await User.findByPk(userId);
          await deleteuser.destroy();
          res.status(204).json("grocery deleted successfully"); 
        } catch (error) {
          res.status(500).json({ error: { ...error } });
        }
      };




// update user

      export const userUpdate = async (req, res) => {
   
      
        const userId = req.params.id;
        const updatedUser = req.body; 
        try {
          const userupdate = await User.findByPk(userId);
      
      
          await userupdate.update(updatedUser);
          const updateduser = await User.findByPk(userId);
      
          res.status(200).json(updateduser);
        } catch (error) {
          res.status(500).json({ error: { ...error } });
        }
      };
 