import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import React from 'react';
import LoginnButton from '../auth/LoginnButton';

export const NotAuthenticatedCard = () => {
  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader>
        <CardTitle>You need to be logged in to view this page</CardTitle>
      </CardHeader>
      <CardFooter>
        <LoginnButton />
      </CardFooter>
    </Card>
  );
};