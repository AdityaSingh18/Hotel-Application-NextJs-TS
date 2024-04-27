import { useRouter } from 'next/router';
import UpdateHotel from './UpdateDetails';

const UpdateHotelPage = () => {
  const router = useRouter();
  const { hotelId } = router.query;

  return (
    <div>
      {hotelId ? <UpdateHotel hotelId={hotelId} /> : <p>Loading...</p>}
    </div>
  );
};

export default UpdateHotelPage;
