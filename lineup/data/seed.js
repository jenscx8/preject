import { Instructor, Resorts, Certifications, db } from "../server/model.js";
import instructorData from './instructors.json' assert { type: 'json' }

await db.sync({ force: true })

const instructorsInDb = await Promise.all(
    instructorData.map((instructor) => {
        const { firstName, lastName, bio, location, certification } = instructor

        const newInstructor = Instructor.create({
            firstName,
            lastName,
            bio,
            location,
            certification
        })

        return newInstructor
    })
)


await db.close()

console.log(instructorData[0].firstName)