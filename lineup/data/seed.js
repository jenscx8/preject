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


import { Instructor, Resorts, Certifications, Users, Review, db } from "../server/model.js";
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
      // find or create new user based on first name last name email password

      // const [user, created] = await Users findOrCreate({
      //   where: { firstName, lastName, email, password }
      // })

      // Associate instructor with the resort
      await newInstructor.setResort(resort);

      // associate user with instructor
      // await newInstructor.setUser(user)

      return { instructor: newInstructor, resort };
    })
  );

// Create users and associate them with instructors
await Promise.all(
  instructorsAndResorts.map(async ({ instructor }) => {
    const newUser = await Users.create({
      // ... User-specific properties
      userName: `${instructor.firstName} ${instructor.lastName}`,
      email: 'user@example.com',
      password: 'password',
    });

    // Associate user with instructor
    await newUser.setInstructor(instructor);
  })
);



    //  // Create reviews and associate them with users and instructors
     await Promise.all(
      instructorsAndResorts.map(async ({ instructor }) => {
        const newReview = await Review.create({
          text: 'A great experience!',
        });

        // Associate review with user and instructor
        //await newReview.setUser(instructor.user);
        await newReview.setInstructor(instructor.instructor);
      })
    );

  //admin data
  // const admins = await Promise.all(
  //   adminData.map(async (admin) => {
  //     const { userName, password } = admin

  //     const newAdmin = await admin.create({ 
  //       userName,
  //       password
  //      })

  //      return {admin: newAdmin}
  //   })
  // )

  await db.close();

  instructorsAndResorts.forEach(({ instructor }) => {
    console.log(`Created instructor: ${instructor.firstName}`);
  });
};

seedDatabase().catch((error) => {
  console.error('Error during seeding:', error);
});
