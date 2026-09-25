import { Hono } from "hono";
import fs from "fs/promises"

const bookings = new Hono({ strict: false });

/* bookings.get("/", async (c) => {
  try {
    const data = await fs.readFile("src/data/bookings.json", {
          encoding: "utf8",
        });
    const bookings: Booking[] = JSON.parse(data);

    return c.json(bookings);
  } catch (e) {
    console.warn("Error getting bookings from json", e);
    return [];
  }
}); */

async function getBookings(): Promise<Booking[]> {
  try {
    const data = await fs.readFile("src/data/bookings.json", {
      encoding: "utf8",
    });
    const bookings: Booking[] = JSON.parse(data);
    return bookings;
  } catch (e) {
    console.warn("Error getting bookings from json", e);
    return [];
  }
}

bookings.get("/", async (c) => {
  const bookings = await getBookings();
  return c.json(bookings);
});

//Hämta beroende på ID
bookings.get("/:id", async (c) => {
  const bookings = await getBookings();
  const bookingId = c.req.param("id");
  const booking = bookings.find(
    (booking) => booking.booking_id === bookingId,
  );
  if (!booking) {
    return c.json(null, 404);
  }
  return c.json(booking);
});

export default bookings;