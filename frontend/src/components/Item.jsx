import React from "react";

const Item = () => {
  return (
    <a href="/" className="flex flex-col gap-2">
      <img
        src="https://a0.muscache.com/im/pictures/miso/Hosting-884714536239845882/original/5a6f7f81-2727-4961-9e84-c2d7ba9bb36a.jpeg?im_w=720"
        alt="alt"
        className="aspect-square rounded-2xl object-cover"
      />

      <div>
        <h3 className="text-1xl font-semibold">
          Alto Paraíso do Goiás, Brasil
        </h3>
        <p className="truncate text-gray-600">
          12 km até Parque Nacional da Chapada dos Veadeiros
        </p>
      </div>

      <p>
        <span className="font-semibold">R$ 550</span> por noite
      </p>
    </a>
  );
};

export default Item;
