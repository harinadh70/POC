import { useLocation } from 'react-router';
import Button from '@mui/material/Button';

// ----------------------------------------

export default function PageNotFound() {
  const location = useLocation();

  return (
    <main className="bg-white h-[calc(100vh-122px)]! grid items-center pt-11">
      <div className="grid grid-cols-1 justify-center items-center">
        <p className="text-[#0A2C6E] text-center w-full text-2xl! font-semibold! mb-10!">
          Page Not Found
        </p>
        <p className="text-[#0A2C6E] text-center w-full text-sm! font-medium!">
          We couldn't find a page at <code>{location.pathname}</code>.
        </p>
        <div className="grid grid-cols-3 grid-flow-col justify-center max-w-[50%] m-auto! gap-4 mt-10 min-h-100⟪?⟫
          <div>
            <Button
              variant="contained"
              className="p-4! flex flex-col shadow-none!"
              sx={{ bgcolor: '#fff' }}
              onClick={() => (window.location.href = '/')}
            >
              <p className="text-[#0A2C6E] capitalize pt-2!">Back to Home</p>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
