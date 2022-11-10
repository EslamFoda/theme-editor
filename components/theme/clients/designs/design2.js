import Container from "../../../ui/Container/container";
import Title from "../common/title";
import { clientsData } from "../../../../constant/";
import cn from "clsx";
import Image from "next/image";
import SubTitle from "../common/subTitle";
import EditorComp from "../../../editor";
const Design2 = ({ device, choose, handleEdit, clientData }) => {
  const gridClassName = cn(
    "grid gap-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1",
    {
      "!grid-cols-1": device === "mobile",
    }
  );
  return (
    <>
      {choose ? (
        <Container className="absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-center space-y-1  mb-5">
            <Title choose={choose} title={"Our Clients"} />
            <SubTitle
              choose={choose}
              subTitle={
                "Some of the world’s biggest brands trust us with their services"
              }
            />
          </div>
          <div
            className={
              "grid lg:grid-cols-4 gap-1 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 w-full"
            }
          >
            {clientsData.map((client) => (
              <div
                key={client.id}
                className="border p-1 items-center border-gray-border flex justify-center"
              >
                <div className="relative h-4 w-6">
                  <Image
                    src={client.img}
                    layout="fill"
                    objectFit="contain"
                    className="absolute"
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <Container className="py-16 ">
          <div className="text-center space-y-4 mb-16">
            <EditorComp
              initialValue={clientData.title}
              handleEdit={handleEdit}
              keys="title"
            />
            <EditorComp
              initialValue={clientData.subTitle}
              handleEdit={handleEdit}
              keys="subTitle"
            />
          </div>
          <div className={gridClassName}>
            {clientsData.map((client) => (
              <div
                key={client.id}
                className="border p-2 items-center border-gray-border flex justify-center"
              >
                <div className="relative h-20 w-44">
                  <Image
                    src={client.img}
                    layout="fill"
                    objectFit="contain"
                    className="absolute"
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default Design2;
