import Container from "../../../ui/Container/container";
import Title from "../common/title";
import SubTitle from "../common/subTitle";
import ServiceTitle from "../common/serviceTitle";
import ServiceSubTilte from "../common/serviceSubTitle";
import Button from "../../../ui/Button";
import { servicesData } from "../../../../constant/";

import cn from "clsx";
import EditorComp from "../../../editor";
const Design5 = ({
  device,
  choose,
  serviceData,
  editServiceDesc,
  editServiceTitle,
  editServiceBtn,
  editServiceHeadTitle,
  editServiceSubTitle,
  serviceHeaders,
}) => {
  const gridClassName = cn(
    "grid gap-10 lg:grid-cols-2 text-center md:grid-cols-2 sm:grid-cols-1 grid-cols-1",
    {
      "!grid-cols-1": device === "mobile",
      "!gap-2": choose,
    }
  );
  const headersClassName = cn(
    "grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mb-16",
    { "!grid-cols-1": device === "mobile", "!mb-2": choose }
  );
  return (
    <>
      {choose ? (
        <Container className="py-2 ">
          <div className={headersClassName}>
            <Title choose={choose} />
            <SubTitle choose={choose} />
          </div>
          <div className={gridClassName}>
            {servicesData.map((service) => (
              <div key={service.id} className=" space-y-1">
                <div
                  style={{ backgroundImage: `url(${service.imgUrl})` }}
                  className="bg-no-repeat bg-center bg-cover   h-12 w-full"
                ></div>
                <ServiceTitle title={service.title} choose={choose} />
                <ServiceSubTilte subTitle={service.subTitle} choose={choose} />
                <button className="text-small">READ MORE</button>
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <Container className="py-16 ">
          <div className={headersClassName}>
            <EditorComp
              initialValue={serviceHeaders.title}
              handleEdit={editServiceHeadTitle}
            />
            <EditorComp
              initialValue={serviceHeaders.subTitle}
              handleEdit={editServiceSubTitle}
            />
          </div>
          <div className={gridClassName}>
            {serviceData?.map((service) => (
              <div key={service.id} className=" space-y-5">
                <div
                  style={{ backgroundImage: `url(${service.pic})` }}
                  className="bg-no-repeat bg-center bg-cover   h-72 w-full"
                ></div>
                <EditorComp
                  initialValue={service.title}
                  id={service.id}
                  handleMultiEdit={editServiceTitle}
                />
                <EditorComp
                  initialValue={service.desc}
                  id={service.id}
                  handleMultiEdit={editServiceDesc}
                />
                <Button variant="primary">
                  <EditorComp
                    id={service.id}
                    initialValue={service.btn}
                    handleMultiEdit={editServiceBtn}
                  />
                </Button>
              </div>
            ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default Design5;
