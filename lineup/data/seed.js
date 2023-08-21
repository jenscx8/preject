// import { Instructor, Resorts, Certifications, db } from "../server/model.js";
// import instructorData from './instructors.json' assert { type: 'json' }

// await db.sync({ force: true })

// const instructorsInDb = await Promise.all(
//     instructorData.map((instructor) => {
//         const { firstName, lastName, bio, location, certification } = instructor

//         const newInstructor = Instructor.create({
//             firstName,
//             lastName,
//             bio,
//             location,
//             certification
//         })

//         return newInstructor
//     })
// )

// const resortsInDb = await Promise.all(
//     instructorData.map((resort) => {
//         const { location } = resort

//         const newResort = Resorts.create({ location })

//         return newResort
//     })
// )


// await db.close()

// console.log(instructorData[0].firstName)


import { Instructor, Resorts, Certifications, db } from "../server/model.js";
import instructorData from './instructors.json' assert { type: 'json' }

const seedDatabase = async () => {
  await db.sync({ force: true });

  const instructorsAndResorts = await Promise.all(
    instructorData.map(async (instructor) => {
      const { firstName, lastName, bio, location, certification } = instructor;

      const newInstructor = await Instructor.create({
        firstName,
        lastName,
        bio,
        certification
      });

      // Find or create resort based on location
      const [resort, created] = await Resorts.findOrCreate({
        where: { location },
      });

      // Associate instructor with the resort
      await newInstructor.setResort(resort);

      return { instructor: newInstructor, resort };
    })
  );

  await db.close();

  instructorsAndResorts.forEach(({ instructor }) => {
    console.log(`Created instructor: ${instructor.firstName}`);
  });
};

seedDatabase().catch((error) => {
  console.error('Error during seeding:', error);
});
