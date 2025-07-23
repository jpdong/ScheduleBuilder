import React from 'react';
import SharedSchedulePage from '../../../../src/pages/SharedSchedulePage';

interface SharedSchedulePageProps {
  params: {
    shareId: string;
  };
}

export default function SharedSchedule({ params }: SharedSchedulePageProps) {
  return <SharedSchedulePage shareId={params.shareId} />;
}