const express = require('express')
const router = express.Router()
const members = require('../../Members')
const uuid = require('uuid')
//get all members
router.get('/',(req,res) =>{ 
    res.json(members)
})
//get a member
router.get('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    console.log(found)
    if(found){
        res.json(members.filter(member => member.id ===parseInt(req.params.id)))
    }else{
        res.status(400).json({msg:`No member match this id ${req.params.id}`})
    }
})
//post a member to the api
router.post('/',(req,res) => {
    const newMember = {
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        address:req.body.address
    }

    if (newMember.name == null || newMember.email == null) {
        res.status(400).send({msg:'please fill full the blank'})
    }
    members.push(newMember)
    res.redirect('/')
})
//delete a member of api
router.delete('/:id' , (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    console.log(found)
    if(found){
        res.json(members.filter(member => member.id !== parseInt(req.params.id)))
    }
})
//update member
router.put('/:id',(req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        const updatedMember = req.body
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updatedMember.name ?  updatedMember.name : member.name;
                member.email = updatedMember.email ?  updatedMember.email : member.email;
                member.address = updatedMember.address ?  updatedMember.address : member.address;

                res.json({msg:'updated succesfully', member})
            }
        })
    }else{
        res.status(400).send({msg:`No member with the id of ${req.params.id}`})
    }
})

module.exports = router