const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/baby-age', function (req, res) {
  res.render('baby-age')
})

router.post('/baby-age', function (req, res) {
  const answer = req.session.data['baby-age']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'baby-age': 'Select your age range.' }
    return res.render('baby-age')
  }
  if (answer === '0-3-months') {
    return res.redirect('/feeding-frequency')
  } else if (answer === '4-6-months') {
    return res.redirect('/feeding-frequency')
  } else if (answer === '7-12-months') {
    return res.redirect('/feeding-frequency')
  } else if (answer === 'over-12-months') {
    return res.redirect('/ineligible-baby-age')
  }
  res.redirect('/feeding-frequency')
})

router.get('/ineligible-baby-age', function (req, res) {
  res.render('ineligible-baby-age')
})

router.get('/feeding-frequency', function (req, res) {
  res.render('feeding-frequency')
})

router.post('/feeding-frequency', function (req, res) {
  const answer = req.session.data['feeding-frequency']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'feeding-frequency': 'Select how often you want to feed.' }
    return res.render('feeding-frequency')
  }
  if (answer === 'every-2-hours') {
    return res.redirect('/preferred-times')
  } else if (answer === 'every-3-hours') {
    return res.redirect('/preferred-times')
  } else if (answer === 'every-4-hours') {
    return res.redirect('/preferred-times')
  } else if (answer === 'on-demand') {
    return res.redirect('/ineligible-feeding-frequency')
  }
  res.redirect('/preferred-times')
})

router.get('/ineligible-feeding-frequency', function (req, res) {
  res.render('ineligible-feeding-frequency')
})

router.get('/preferred-times', function (req, res) {
  res.render('preferred-times')
})

router.post('/preferred-times', function (req, res) {
  const answer = req.session.data['preferred-times']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'preferred-times': 'Select your preferred first feed time.' }
    return res.render('preferred-times')
  }
  if (answer === '6am') {
    return res.redirect('/milk-type')
  } else if (answer === '7am') {
    return res.redirect('/milk-type')
  } else if (answer === '8am') {
    return res.redirect('/milk-type')
  } else if (answer === 'after-9am') {
    return res.redirect('/milk-type')
  }
  res.redirect('/milk-type')
})

router.get('/milk-type', function (req, res) {
  res.render('milk-type')
})

router.post('/milk-type', function (req, res) {
  const answer = req.session.data['milk-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'milk-type': 'Select the type of milk you drink.' }
    return res.render('milk-type')
  }
  if (answer === 'breast-milk') {
    return res.redirect('/special-instructions')
  } else if (answer === 'formula-milk') {
    return res.redirect('/special-instructions')
  } else if (answer === 'cows-milk') {
    return res.redirect('/ineligible-milk-type')
  } else if (answer === 'plant-milk') {
    return res.redirect('/ineligible-milk-type')
  }
  res.redirect('/special-instructions')
})

router.get('/ineligible-milk-type', function (req, res) {
  res.render('ineligible-milk-type')
})

router.get('/special-instructions', function (req, res) {
  res.render('special-instructions')
})

router.post('/special-instructions', function (req, res) {
  const answer = req.session.data['special-instructions']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'special-instructions': 'Enter your special feeding needs or write \'none\'.' }
    return res.render('special-instructions')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('BF')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
