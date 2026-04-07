import React from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import type { ParkingSpot } from '../types';

interface Props {
  spots: ParkingSpot[];
  selectedSpotId: string | null;
  onSelectSpot: (id: string) => void;
  containerWidth: number;
}

const STAGE_WIDTH = 640;
const STAGE_HEIGHT = 640;

export const ParkingMap: React.FC<Props> = ({ spots, selectedSpotId, onSelectSpot, containerWidth }) => {
  const scale = containerWidth < STAGE_WIDTH ? containerWidth / STAGE_WIDTH : 1;

  return (
    <div className="flex justify-center bg-slate-100/50 p-6 rounded-2xl border border-slate-200 overflow-hidden shadow-inner backdrop-blur-sm">
      <Stage width={STAGE_WIDTH * scale} height={STAGE_HEIGHT * scale} scaleX={scale} scaleY={scale}>
        <Layer>
          {spots.map((spot) => (
            <Group
              key={spot.id}
              x={spot.x}
              y={spot.y}
              onClick={() => {
                if (!spot.isOccupied) {
                  onSelectSpot(spot.id);
                }
              }}
              onTap={() => {
                if (!spot.isOccupied) {
                  onSelectSpot(spot.id);
                }
              }}
              style={{ cursor: spot.isOccupied ? 'not-allowed' : 'pointer' }}
            >
              <Rect
                width={spot.width}
                height={spot.height}
                fill={spot.isOccupied ? '#f43f5e' : (selectedSpotId === spot.id ? '#4f46e5' : '#10b981')}
                stroke={selectedSpotId === spot.id ? '#ffffff' : '#ffffff33'}
                strokeWidth={selectedSpotId === spot.id ? 4 : 1}
                cornerRadius={12}
                shadowColor="#000"
                shadowBlur={10}
                shadowOpacity={0.08}
                shadowOffsetX={4}
                shadowOffsetY={4}
              />
              <Rect
                width={spot.width}
                height={2}
                y={spot.height - 20}
                fill="white"
                opacity={0.3}
              />
              <Text
                text={spot.id}
                x={0}
                y={spot.height / 2 - 12}
                width={spot.width}
                align="center"
                fontSize={22}
                fontStyle="bold"
                fill="white"
                fontFamily="Inter, sans-serif"
              />
              <Text
                text={spot.isOccupied ? 'Occupied' : 'Available'}
                x={0}
                y={spot.height / 2 + 18}
                width={spot.width}
                align="center"
                fontSize={10}
                fontStyle="bold"
                fill="white"
                opacity={0.8}
                letterSpacing={1}
                textTransform="uppercase"
              />
            </Group>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
