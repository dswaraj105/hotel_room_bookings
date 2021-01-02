exports.getPartyDelhi = (req, res, next) => {
  res.render('partydelhi' ,{
    home: false
  });
};

exports.getPartyPatna = (req, res, next) => {
  res.render('partypatna', {
    home: false
  });
};

exports.postpartybooking = (req, res, next) => {
  const rooms = req.body.halls;
  const cost = req.body.totalamt;
  const daysCount = req.body.daysCount;
  const date = req.body.date;
  const location = req.params.location;
  console.log(location, rooms, cost, daysCount, date);
  res.redirect('/');
}

