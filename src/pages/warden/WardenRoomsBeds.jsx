import { useEffect, useState } from "react";

function WardenRoomsBeds() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/auth/warden/rooms/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load rooms and beds.");
        }

        return response.json();
      })
      .then((data) => {
        setHostels(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load rooms and beds.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Rooms & Beds</h1>
        <p>Loading rooms and beds...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Rooms & Beds</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Rooms & Beds</h1>

      {hostels.length === 0 ? (
        <p>No hostel data found.</p>
      ) : (
        hostels.map((hostel) => (
          <div key={hostel.id}>
            
            <h2>{hostel.name}</h2>

            {hostel.blocks.map((block) => (
              <div key={block.id}>
                
                <h3>{block.name}</h3>

                {block.rooms.map((room) => (
                  <div key={room.id}>
                    
                    <h4>
                      Room {room.room_number}
                    </h4>

                    <p>
                      Capacity: {room.capacity}
                    </p>

                    {room.beds.map((bed) => (
                      <div key={bed.id}>
                        <span>
                          Bed {bed.bed_number}
                        </span>

                        <span>
                          {" "}
                          — {bed.status}
                        </span>
                      </div>
                    ))}

                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default WardenRoomsBeds;