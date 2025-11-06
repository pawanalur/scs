import Button from "../../Shared/components/Button";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      className="
        flex md:flex-col justify-between 
        w-full h-full 
        md:space-y-3 gap-3
      "
    >
      {/* Top section (In Progress + Quests) */}
      <div className="flex md:flex-col w-2/3 md:w-auto justify-between md:justify-start md:space-y-3 gap-3">
        <Button
          label={
            <>
              <span className="md:hidden">IP</span>
              <span className="hidden md:inline">In Progress</span>
            </>
          }
          className="flex-1 w-full"
          styleVariant="brown"
          onClick={() => navigate("/home")}
        />
        <Button
          label={
            <>
              <span className="md:hidden">Q</span>
              <span className="hidden md:inline">Quests</span>
            </>
          }
          className="flex-1 w-full"
          styleVariant="brown"
          onClick={() => navigate("/home/quests")}
        />
      </div>

      {/* Bottom section (Shop) */}
      <div className="md:mt-auto w-1/3 md:w-full">
        <Button
          label={
            <>
              <span className="md:hidden">S</span>
              <span className="hidden md:inline">Shop</span>
            </>
          }
          className="w-full"
          styleVariant="brown"
          onClick={() => navigate("/home/shop")}
        />
      </div>
    </div>
  );
}

export default Sidebar;
