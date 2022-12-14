import Container from "../../../ui/container";
import { clientsData } from "../../../../constant/";
import cn from "clsx";
import Image from "next/image";
import Title from "../common/title";
import SubTitle from "../common/subTitle";
import EditorComp from "../../../editor";
import { EditPopover } from "../../../ui/popover/EditPopover";
import ClientPic from "../common/clientPic";
const Design1 = ({
  device,
  choose,
  handleEdit,
  clientData,
  comp,
  compIndex,
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
              "grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 w-full"
            }
          >
            {clientsData.map((client) => (
              <div
                key={client.id}
                className="relative justify-self-center h-4 w-6"
              >
                <Image
                  src={client.img}
                  layout="fill"
                  objectFit="contain"
                  className="absolute"
                />
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <div>
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
              {clientData.items.map((client, index) => (
                <div className="justify-self-center" key={client.id}>
                  <EditPopover comp={comp} index={index}>
                    <div>
                      <ClientPic
                        design="design1"
                        client={client}
                        comp={comp}
                        compIndex={compIndex}
                        index={index}
                      />
                    </div>
                  </EditPopover>
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
