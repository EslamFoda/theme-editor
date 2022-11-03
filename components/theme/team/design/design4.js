import Container from "../../../ui/Container/container";
import Title from "../common/title";
import SubTitle from "../common/subTitle";
import { teamData } from "../../../../constant/";
import Name from "../common/name";
import Position from "../common/position";
import cn from "clsx";
const Design4 = ({ device, choose }) => {
  const gridClassName = cn(
    "grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1",
    {
      "!grid-cols-1": device === "mobile",
    }
  );
  return (
    <>
      {choose ? (
        <Container className="py-0 pt-2">
          <div className="text-center space-y-1  mb-2">
            <Title choose={choose} />
            <SubTitle choose={choose} />
          </div>
          <div
            className={
              "grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-y-2 w-full"
            }
          >
            {teamData.map((team) => (
              <div key={team.id} className="text-center space-y-1">
                <div
                  style={{ backgroundImage: `url(${team.img})` }}
                  className="bg-no-repeat bg-center bg-cover overflow-hidden m-auto h-5 w-5 rounded-full"
                ></div>
                <Name name={team.name} choose={choose}/>
                <Position position={team.position} choose={choose}/>
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <Container className="py-16 ">
          <div className="text-center space-y-4 mb-16">
            <Title choose={choose}/>
            <SubTitle choose={choose}/>
          </div>
          <div className={gridClassName}>
            {teamData?.map((team) => (
              <div key={team.id} className="text-center hover:shadow-custom rounded-md transition-all py-4 space-y-5">
                <div
                  style={{ backgroundImage: `url(${team.img})` }}
                  className="bg-no-repeat bg-center bg-cover overflow-hidden m-auto h-32 w-32 rounded-full"
                ></div>
                <Name name={team.name} choose={choose}/>
                <Position position={team.position} choose={choose}/>
              </div>
            ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default Design4;