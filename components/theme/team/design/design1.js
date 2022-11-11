import Container from "../../../ui/Container/container";
import Title from "../common/title";
import SubTitle from "../common/subTitle";
import Name from "../common/name";
import About from "../common/about";
import Position from "../common/position";
import cn from "clsx";
import EditorComp from "../../../editor";
import { teamsData } from "../../../../constant";
const Design1 = ({
  device,
  choose,
  handleMultiEdit,
  handleEdit,
  teamData,
  headers,
  backgroundColor,
}) => {
  const gridClassName = cn(
    "grid gap-10 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1",
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
              "grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 w-full"
            }
          >
            {teamsData?.map((team) => (
              <div key={team.id} className="text-center space-y-1">
                <div
                  style={{ backgroundImage: `url(${team.img})` }}
                  className="bg-no-repeat bg-center bg-cover overflow-hidden m-auto h-5 w-5 rounded-full"
                ></div>
                <Name name={team.name} choose={choose} />
                <Position position={team.position} choose={choose} />
                <About about={team.about} choose={choose} />
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <div style={{
          backgroundColor: `rgba(${backgroundColor?.r}, ${backgroundColor?.g}, ${backgroundColor?.b}, ${backgroundColor?.a})`,
          transition: "all .5s ease-in-out",
        }}>
        <Container className="py-16 ">
          <div className="text-center space-y-4 mb-16">
            <EditorComp
              initialValue={headers.title}
              handleEdit={handleEdit}
              keys="title"
            />
            <EditorComp
              initialValue={headers.subTitle}
              handleEdit={handleEdit}
              keys="subTitle"
            />
          </div>
          <div className={gridClassName}>
            {teamData?.map((team) => (
              <div key={team.id} className="text-center space-y-5">
                <div
                  style={{ backgroundImage: `url(${team.pic})` }}
                  className="bg-no-repeat bg-center bg-cover overflow-hidden m-auto h-28 w-28 rounded-full"
                ></div>
                <EditorComp
                  initialValue={team.userName}
                  id={team.id}
                  handleMultiEdit={handleMultiEdit}
                  keys="userName"
                />
                <EditorComp
                  initialValue={team.position}
                  id={team.id}
                  handleMultiEdit={handleMultiEdit}
                  keys="position"
                />
                <EditorComp
                  initialValue={team.about}
                  id={team.id}
                  handleMultiEdit={handleMultiEdit}
                  keys="about"
                />
              </div>
            ))}
          </div>
        </Container>
        </div>
      )}
    </>
  );
};

export default Design1;
