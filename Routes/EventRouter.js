const  express= require("express");
const EventController=require("../Controllers/Events");
const router = express.Router();

router.use(express.json());
router.route("/").get(EventController.getEvents);
router.route("/").post(EventController.createEvent);
router.route("/:id").put(EventController.updateEventData);
router.route("/:id").delete(EventController.deleteEvent);

module.exports = router;
