import React, { FC } from "react";
import { CartesianGrid, Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import { theme } from "../../utils/theme";
import { Customer } from "./Customer";

type Props = {
  customers: Customer[];
};

const LineContainer = styled.div`
  display: flex;
`;

export const Graph: FC<Props> = ({ customers }) => {
  return (
    <LineContainer>
      <BarChart
        width={300}
        height={200}
        data={customers}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <CartesianGrid  vertical={false} />
        <XAxis dataKey="time" axisLine tickLine={false} tick={{ fontSize: 16, fill: "#000" }} />
        <YAxis dataKey="count" axisLine={false} tickLine={false} tick={{ fontSize: 16, fill: "#000" }} />
        <Bar dataKey="count" fill={theme.colors.brown} />
        <Tooltip
          contentStyle={{ backgroundColor: "#fff", border: "none" }}
          labelStyle={{ color: "#000" }}
          separator=""
          cursor={{ stroke: theme.colors.brown, strokeWidth: 2, opacity: 0.3 }}
        />
      </BarChart>
    </LineContainer>
  );
};
