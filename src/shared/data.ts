export const cart = [
  {
    product: {
      id: '1a2b3c4d-5678-9101-1121-314151617181',
      title: 'Sketch Pad A4 100 Sheets',
      description: 'A4 size premium sketch pad with micro-perforated pages.',
      price: 15,
    },
    count: 3,
  },
  {
    product: {
      id: '2b3c4d5e-6789-1011-1213-415161718192',
      title: 'Watercolor Brush Set 5pcs',
      description: 'Synthetic brushes ideal for watercolor and ink.',
      price: 25,
    },
    count: 1,
  },
  {
    product: {
      id: '3c4d5e6f-7890-1112-1314-516171819203',
      title: 'Acrylic Paint Set 12x20ml',
      description:
        'Vibrant and fast-drying acrylic paints for various surfaces.',
      price: 35,
    },
    count: 2,
  },
];

export const order = [
  {
    id: '60aebc99-1c0b-4ef8-bb6d-7bb9bd380cc3',
    userId: 'a1b2c3d4-5e6f-7081-91a1-b2c3d4e5f6a7',
    cartId: 'd0f1e2c3-4b5a-6c7d-8e9f-0a1b2c3d4e5f',
    address: {
      address: '789 Maple Ave',
      firstName: 'Alice',
      lastName: 'Smith',
      comment: 'Leave at front desk',
    },
    statusHistory: [],
    items: [
      {
        count: 1,
        productId: '1a2b3c4d-5678-9101-1121-314151617181',
      },
      {
        count: 2,
        productId: '2b3c4d5e-6789-1011-1213-415161718192',
      },
    ],
  },
  {
    id: '70becd88-2d1c-4fa8-bb6d-8bb9cd480ee4',
    userId: 'b2c3d4e5-f6a7-8192-a1b2-c3d4e5f6a789',
    cartId: 'e1f2g3h4-5i6j-7k8l-9m0n-1o2p3q4r5s6t',
    address: {
      address: '123 Birch Ln',
      firstName: 'Bob',
      lastName: 'Johnson',
      comment: 'Ring the bell twice',
    },
    statusHistory: [],
    items: [
      {
        count: 3,
        productId: '3c4d5e6f-7890-1112-1314-516171819203',
      },
    ],
  },
];
