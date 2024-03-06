import Button from '@mui/material/Button';

export function DefaultBtn({ children, onClick, type, color }) {
  return (
    <Button variant="contained" color={color} onClick={onClick} type={type}>
      {children}
    </Button>
  );
}
