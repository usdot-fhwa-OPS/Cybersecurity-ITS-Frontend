# ITS Secure Prototype (ITS2P)

The ITS Secure Prototype (ITS2P) will provide the ITS Vendor community with a reference design and example implementation of a mobile application and backend cloud service that can be used to guide ITS vendor customers in the secure configuration of ITS equipment. ITS vendors will be able to use the prototype to design their own custom versions of the mobile application and offer the application to their customer base.

Vendor-customized and deployed ITS2P instances can be used by ITS Field Technicians as an aid, providing them with the equipment vendor’s recommended security configuration details for the specific equipment type, connection type and intended use. The ITS2P tool is a mobile application that an ITS Technician can install on either an Android or iPhone device.

## Contents
This repository contains the source code for the user-facing frontend components of the Vendor Portal for the ITS2P application. This component allows Vendor-role users to administrate both users and data. Vendor-role users are able to create user accounts, manage user permissions, and upload and modify device configuration recommendations.

# Structure:
- `api/`: Functions related to Cybersecurity for ITS2P API calls
- `app/`: General structure for the application
- `common/`: Shared comonents, data, and utilities
- `config/`: Configuration elements for the application
- `features/`: Packages with individual features for the application such as authentication and configuration
- `pages/`:  The overall page structures for the application
- `theme/`: Theme definition for the application

## Related Repositories:
 - [ITS-ITS-Secure-Prototype-Backend](https://github.com/usdot-fhwa-OPS/ITS-Secure-Prototype-Backend): The backend cloud services to connect technician and vendor users.
 - [ITS-Secure-Prototype-App](https://github.com/usdot-fhwa-OPS/ITS-Secure-Prototype-App): The mobile application for use by field technicians
