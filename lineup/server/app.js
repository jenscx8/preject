import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import { Instructor, Resorts } from './model.js';
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

// get instructor:id
app.get('/api/instructors/:instructorId', async (req, res) => {
    const { instructorId } = req.params;
    const istructor = await Instructor.findByPk(instructorId);
    res.json(istructor);
  });

// post create instructor
app.post('/api/instructors/create', async (req, res) => {
  const { firstName, lastName, bio, location, certification, email, password } = req.body

  const newInstructor = await Instructor.create({ firstName: firstName, lastName: lastName, bio: bio, location: location, certification: certification, email: email, password: password })

  res.json(newInstructor)
})  

// post auth login
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
app.post('/api/logout', (req, res) => {
    if (!req.session.instructorId) {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      req.session.destroy();
      res.json({ success: true });
    }
  });

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
app.get('/api/instructors/:id/profile', async (req, res) => {
  const { instructorId } = req.session

  const instructor = await Instructor.findByPk(instructorId)
  res.json(instructor)
})  

// add login required
// post edit profile
app.put('/api/instructors/:id', async (req, res) => {
  
  const { id } = req.session
  const { bio, location, certification } = req.body

  // const index = instructorData.findIndex((instructor) => instructor.instructorId === Number(instructorId));
  // const item = instructorData[index];
  const item = await Instructor.findByPk(id)
  console.log(item)


  // Only update the values that are provided in req.body
  item.bio = bio ?? item.bio;
  item.location = location ?? item.location;
  item.certification = certification ?? item.certification;

  await item.save()
  res.json(item)
})



// add login required
// post delete profile
app.put('/api/instructors/:id/delete', async (req, res) => {
  const { id } = req.params
  const instructor = await Instructor.findByPk(id)
  if (Instructor.findByPk(id) === -1) {
    res.status(404).json({error: `item with id ${id} not found`})
  } else { 
    (await Instructor.findAll()).slice(instructor, 1)
    res.json({ id: Number(id) });
  }
  
})

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));


// create a resorts route that will await Resorts.findAll() and res.json it 
// create a sorted instructor list that will use params to await the instructor list where location = mountain i think

