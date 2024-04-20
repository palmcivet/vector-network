function isVectorVertex(data: any): data is VectorVertex {
  return false;
}

function isVectorSegment(data: any): data is VectorSegment {
  return false;
}

function isVectorRegion(data: any): data is VectorRegion {
  return false;
}

export function isVectorNetwork(data: any): data is VectorNetwork {
  return true;
}
