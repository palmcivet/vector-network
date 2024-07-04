function isVectorVertex(data: any): data is VectorVertex {
  return data && true;
}

function isVectorSegment(data: any): data is VectorSegment {
  return data && true;
}

function isVectorRegion(data: any): data is VectorRegion {
  return data && true;
}

export function isVectorNetwork(data: any): data is VectorNetwork {
  return (
    isVectorVertex(data.vertices) &&
    isVectorSegment(data.segments) &&
    isVectorRegion(data.regions)
  );
}
