interface ForecastCardProps {
  date: string;
  temperature: number;
  description: string;
  icon: string;
  unit: "C" | "F";
}

const ForecastCard = ({date,temperature,description, icon,unit}: ForecastCardProps) => {

  return (
    <div className="card">
      <h3>{date}</h3>

      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />

      <p>
        {temperature.toFixed(1)}°{unit}
      </p>

      <p>{description}</p>
    </div>
  );
};
export default ForecastCard;