const router = require('express').Router()
const res = require('express/lib/response')
const { append } = require('express/lib/response')
const Element = require('../models/Element')

// create
router.post('/', async (req,res) => {

    //req.body
    const {position, name, weight, symbol} = req.body

    if(!name) {
        res.status(422).json({error: 'o nome e obrigatorio'})
        return
    } 

    const element = {
        position,
        name,
        weight,
        symbol
    }

    // create dates
    try {

        await Element.create(element)

        res.status(201).json({message: 'elemento criado na tabela do sistema'})
        
    } catch (error) {
        res.status(500).json({error: error})
        
    }
})

//Read

router.get('/', async (req,res) => {
    try {

        const element = await Element.find()
        res.status(200).json(element)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req,res) => {

    //extrair dado req
    const id = req.params.id

    try {

        const element = await Element.findOne({_id: id})

        if(!element) {
            res.status(422).json({message: 'usuario nao encontrado'})
            return
        }

        res.status(200).json(element)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//update (put, patch)
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {position, name, weight, symbol} = req.body

    const element = {
        position,
        name,
        weight,
        symbol
    }

    try {
        
        const updateElement = await Element.updateOne({_id:id}, element)

        if(updateElement.matchedCount === 0) {
            res.status(422).json({message: 'usuario nao encontrado'})
            return
        }

        res.status(200).json(element)

    } catch (error) {
        res.status(500).json({error: error})
    } 
})


//delete

    router.delete('/:id', async (req, res) => {

        const id = req.params.id

        const element = await Element.findOne({_id: id})

        if(!element) {
            res.status(422).json({message: 'usuario nao encontrado'})
            return
        }

        try {
            await Element.deleteOne({_id:id})

            res.status(200).json({message: 'removido com sucesso'})
        } catch (error) {
            res.status(500).json({error: error})
        }
    })

module.exports = router