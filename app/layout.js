export const metadata = {
  title: 'Muhammad Athar Shaikh',
  description: 'Mechanical Engineering — CAD, FEA, and hardware from concept to build.',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}