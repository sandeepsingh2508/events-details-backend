const Event = require("../Models/EventSchema");
const catchAsyncError = require("../Middlewares/CatchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");
const ApiFeatures = require("../Utils/Pagination");

//Get events by pagination(All events) and byId(singleEvent)
exports.getEvents = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  if (req.query.id) {
    const event = await Event.findById(req.query.id);
    if (!event) {
      return next(
        new ErrorHandler(`Event id ${req.query.id} is not found`, 404)
      );
    }
    res.status(200).json({
      status: "true",
      data: event,
    });
  } else {
    const countEvent = await Event.countDocuments();
    const apiFeature = new ApiFeatures(Event.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const event = await apiFeature.query;
    res.status(200).json({
      status: "success",
      data: {
        event,
        countEvent,
      },
    });
  }
});

//create event
exports.createEvent = catchAsyncError(async (req, res, next) => {
  const {
    userId,
    name,
    files: { url },
    tagline,
    description,
    moderator,
    category,
    sub_category,
    rigor_rank,
    attendees,
  } = req.body;
  const event = await Event.create({
    userId,
    name,
    files: {
      url,
    },
    tagline,
    description,
    moderator,
    category,
    sub_category,
    rigor_rank,
    attendees,
    schedule: Date.now(),
  });
  res.status(200).json({
    status: "success",
    message: " New event has created",
  });
});

//Update event data
exports.updateEventData = catchAsyncError(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndMidify: false,
  });
  if (!event) {
    return next(
      new ErrorHandler(`Event id ${req.params.id} is not found`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    message: "Data has been updated",
  });
});

//Delete Events
exports.deleteEvent = catchAsyncError(async (req, res, next) => {
  const event = await Event.findByIdAndRemove(req.params.id);
  if (!event) {
    return next(
      new ErrorHandler(`Event id ${req.params.id} is not found`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    message: "Event has been deleted",
  });
});
