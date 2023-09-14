import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import { Certifications, Instructor, Resorts, Users, Review } from './model.js';
import instructorData from '../data/instructors.json' assert { type: 'json' }

const app = express();
const port = '8000';
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

// auth function
function loginRequired(req, res, next) {
  if (!req.session.instructorId) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
}

// admin function 
// function adminRequired(req, res, next) {
//   if(!req.session.adminId) {
//     res.status(401).json({ error: 'Unauthorized' })
//   } else {
//     next();
//   }
// }

// get resorts
// get instructors
app.get('/api/resorts', async (req, res) => {
  //const { resortId } = req.params {where: {location: resortId}}
  const resortLIist = await Resorts.findAll();
  res.json(resortLIist);
});

// get instructors
app.get('/api/instructors', async (req, res) => {
    //const { resortId } = req.params {where: {location: resortId}}
    const instructorList = await Instructor.findAll();
    res.json(instructorList);
  });

// get certifications
app.get('/api/instructors/certifications', async (req, res) => {
  //const { instructorId } = req.session {where: {certifications: instructorId}}
  const certificationList = await Certifications.findAll();
  res.json(certificationList);
});

// get users
app.get('/api/users', async (req, res) => {
  const userList = await Users.findAll();
  res.json(userList);
});

// get reviews
app.get('/api/instructors/profile/reviews', async (req, res) => {
  //const { instructorId } = req.session {where: {reviews: instructorId}}
  const reviewsList = await Review.findAll();
  res.json(reviewsList);
});

// post create review
app.post('/api/leave-review', async (req, res) => {
  const { userId } = req.session.id
  const { instructorId } = req.params
  const { name, review } = req.body

  const user = await Users.findByPk(userId)

  // create new review
  const newReview = await user.createReview({ instructorId: instructorId, name: name, review: review })
  res.json(newReview)
})

// get instructor:id
app.get('/api/instructors/:instructorId', async (req, res) => {
    const { instructorId } = req.params;
    const istructor = await Instructor.findByPk(instructorId);
    res.json(istructor);
  });

// post create instructor
app.post('/api/instructors/create', async (req, res) => {
  const {
    firstName,
    lastName,
    bio,
    location,
    certification,
    email,
    password,
  } = req.body;

  // Create instructor
  const newInstructor = await Instructor.create({
    firstName,
    lastName,
    bio,
    certification,
    email,
    password,
  });

  // Find or create resort based on location
  // i think im going to seed the database with a list and
  // then i can use findbypk to get the ressort so there isnst any issureee
  const [resort, created] = await Resorts.findOrCreate({
    where: { location },
  });

  // Associate instructor with resort
  // still gonna need this also might need a way to pass in a certification list as well 
  // and picture for future
  await newInstructor.setResort(resort);

  res.json(newInstructor);
});

// admin login
// might need this might not if i can just use if statements
// app.post('/api/admin', async (req, res) => {
//   const { email, password } = req.body
//   const admin = await Admin.findOne({ where: {
//     email: email 
//   } })

//   if (admin && admin.password === password) {
//     req.session.adminId = admin.adminId;
//     res.json({ success: true });
//   } else {
//     res.json({ success: false });
//   }
// })


// post auth login
// make this an instructor login and make the same route but for admin and user
app.post('/api/auth', async (req, res) => {
    const { email, password } = req.body;
    const istructor = await Instructor.findOne({ where: { email: email } });
  
    if (istructor && istructor.password === password) {
      req.session.instructorId = istructor.instructorId;
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });

// post logout 
// might have to do the same for this unless i can just chain if statements 
// wait that might work for the route above too 
app.post('/api/logout', (req, res) => {
    if (!req.session) {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      req.session.destroy();
      res.json({ success: true });
    }
  });

// this is good i think
  app.get('/api/profile', loginRequired, async (req, res) => {
    const { instructorId } = req.session;
  
    const instructor = await Instructor.findByPk(instructorId);
    // const data = await instructor.getData({
    //   include: {
    //     model: Instructor,
    //     attributes: ['firstName','lastName','location','bio','certification','email','password'],
    //   },
    // });
  
    res.json(instructor);
  });

// my profile route
// wait now im confused i need to clean these up
// okay this is the public profile ima keep using the params
app.get('/api/instructors/:id/profile', async (req, res) => {
  const { instructorId } = req.params

  const instructor = await Instructor.findByPk(instructorId)
  res.json(instructor)
})  

// add login required
// post edit profile
// i think this is good for now but i want to make it so the certifications and location chooses from the seeded database insteadd also need to add a way to upload a picture
app.post('/api/edit', loginRequired, async (req, res) => {
  
  const { instructorId } = req.session
  const { bio, location, certification } = req.body

  // const index = instructorData.findIndex((instructor) => instructor.instructorId === Number(instructorId));
  // const item = instructorData[index];
  console.log(instructorId)
  const instructor = await Instructor.findByPk(instructorId)
  


  // Only update the values that are provided in req.body
  instructor.bio = bio ?? instructor.bio;
  instructor.location = location ?? instructor.location;
  instructor.certification = certification ?? instructor.certification;

  await instructor.save()
  res.json(instructor)
})



// add login required
// post delete profile
// this is good
app.post('/api/delete', async (req, res) => {
  // const { id } = req.params
  // const instructor = await Instructor.findByPk(id)
  // if (Instructor.findByPk(id) === -1) {
  //   res.status(404).json({error: `item with id ${id} not found`})
  // } else { 
  //   (await Instructor.findAll()).slice(instructor, 1)
  //   res.json({ id: Number(id) });
  // }
  

  await Instructor.destroy({
      where: {
          instructorId: req.session.instructorId
      }
  })

  res.json(`User ${req.session.firstName} has been deleted`)

  req.session.destroy

})

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));


// create a resorts route that will await Resorts.findAll() and res.json it 
// create a sorted instructor list that will use params to await the instructor list where location = mountain i think

// create a  way to filter the instructor list 
// number of certifications
// level of certifications
// number of reviews
// level of reviews

// i dont really want instructors to make the resorts dynamic anymore ill just have a list to start with
// that shouuld also make it easier to search
// same with certifications
// also i want to include things like age and availability based on dates and make that dynamic 

