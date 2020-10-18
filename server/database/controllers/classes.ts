import {Request, Response} from 'express'
import db from '../connection'

interface ClassSchema {
    week_day: string,
    from: string,
    to: string
}

export default class Classes {
    async index(req: Request, res: Response) {
        const filters = req.query

        const subject = filters.subject as string        
        const week_day = filters.week_day as string        
        const time = filters.time as string

        if(!filters.subject || !filters.week_day || !filters.time) {
            res.status(400).json({
                message: 'Missing arguments to validate the request.'
            })
        }

        const classes = await db('classes')
            .whereExists(function() {
                this.select('schedule.*')
                .from('schedule')
                .whereRaw('`schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`schedule`.`from` <= ??', [Number(time.replace(':', ''))])
                .whereRaw('`schedule`.`to` >= ??', [Number(time.replace(':', ''))])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])

            res.json(classes)
    }

    async create(req: Request, res: Response) {
        const {name, avatar, subject, bio, whatsapp, cost, schedule} = req.body

        const trx = await db.transaction()

        try {
            const userResult = await trx('users').insert({
                name,
                avatar,
                bio,
                whatsapp,
            })

            const user_id = userResult[0]

            const classResult = await trx('classes').insert({
                subject,
                cost,
                user_id,
            })

            const class_id = classResult[0]

            const scheduleFormated = schedule.map((classSchema: ClassSchema) => {
                return {
                    class_id,
                    week_day: Number(classSchema.week_day),
                    from: Number(classSchema.from.replace(':', '')),
                    to: Number(classSchema.to.replace(':', ''))
                }
            })

            await trx('schedule').insert(scheduleFormated)

            await trx.commit()
            
            return res.status(201).send()

        } catch(err) {
            console.log(err)
            trx.rollback()

            return res.status(400).json({
                message: 'An error has ocurred while trying to insert data on database.'
            })
        }
    }
}