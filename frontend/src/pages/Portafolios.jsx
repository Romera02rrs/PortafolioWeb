import usePortafolios from "../hooks/usePortafolios";

const Portafolios = () => {
  const { portafolios } = usePortafolios();

  return (
    <>
      <h1 className="text-4xl font-black capitalize">Tus portafolios</h1>
    </>
  );
};

export default Portafolios;
