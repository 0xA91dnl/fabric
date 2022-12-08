/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const stixs_threat_actor = [
            {
                type: "threat-actor_1",
                spec_version: "2.1",
                id: "threat-actor--8b6297fe-cae7-47c6-9256-5584b417849c",
                created_by_ref: "identity--b38dfe21-7477-40d1-aa90-5c8671ce51ca",
                created: "2017-04-27T16:18:24.318Z",
                modified: "2017-04-27T16:18:24.318Z",
                name_threat_actor: "The Joker",
                threat_actor_types: [
                    "terrorist",
                    "criminal"
                    ],
                aliases: [
                    "Joe Kerr",
                    "The Clown Prince of Crime"
                ],
                roles: [
                    "director"
                ],
                resource_level: "team",
                primary_motivation: "personal-satisfaction",
                object_marking_refs: [
                    "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed"
                ],
                evaluate: "9/10"
            },
            {
                type: "threat-actor_2",
                spec_version: "2.1",
                id: "threat-actor--8b6297fe-cae7-47c6-9256-5584b417849c",
                created_by_ref: "identity--b38dfe21-7477-40d1-aa90-5c8671ce51ca",
                created: "2017-04-27T16:18:24.318Z",
                modified: "2017-04-27T16:18:24.318Z",
                name_threat_actor: "The Joker",
                threat_actor_types: [
                    "terrorist",
                    "criminal"
                    ],
                aliases: [
                    "Joe Kerr",
                    "The Clown Prince of Crime"
                ],
                roles: [
                    "director"
                ],
                resource_level: "team",
                primary_motivation: "personal-satisfaction",
                object_marking_refs: [
                    "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed"
                ],
                evaluate: "8/10"
            },
            {
                type: "threat-actor_3",
                spec_version: "2.1",
                id: "threat-actor--8b6297fe-cae7-47c6-9256-5584b417849c",
                created_by_ref: "identity--b38dfe21-7477-40d1-aa90-5c8671ce51ca",
                created: "2017-04-27T16:18:24.318Z",
                modified: "2017-04-27T16:18:24.318Z",
                name_threat_actor: "The Joker",
                threat_actor_types: [
                    "terrorist",
                    "criminal"
                    ],
                aliases: [
                    "Joe Kerr",
                    "The Clown Prince of Crime"
                ],
                roles: [
                    "director"
                ],
                resource_level: "team",
                primary_motivation: "personal-satisfaction",
                object_marking_refs: [
                    "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed"
                ],
                evaluate: "7/10"
            }
        ];

        for (let i = 0; i < stixs_threat_actor.length; i++) {
            stixs_threat_actor[i].docType = 'stix';
            await ctx.stub.putState('STIX' + i, Buffer.from(JSON.stringify(stixs_threat_actor[i])));
            console.info('Added <--> ', stixs_threat_actor[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, Number) {
        const stixAsBytes = await ctx.stub.getState(Number); // get the car from chaincode state
        if (!stixAsBytes || stixAsBytes.length === 0) {
            throw new Error(`${Number} does not exist`);
        }
        console.log(stixAsBytes.toString());
        return stixAsBytes.toString();
    }

    async createCar(ctx, Number, type,spec_version, id, created_by_ref, created, modified, name_threat_actor, threat_actor_types, aliases, roles, resource_level, primary_motivation, object_marking_refs, evaluate) {
        console.info('============= START : Create STIX (Threat Actor) ===========');

        const stix_threat_actor = {
            docType: 'stix',
            type,
            spec_version,
            id,
            created_by_ref,
            created,
            modified,
            name_threat_actor,
            threat_actor_types,
            aliases,
            roles,
            resource_level,
            primary_motivation,
            object_marking_refs,
            evaluate
        };

        await ctx.stub.putState(Number, Buffer.from(JSON.stringify(stix_threat_actor)));
        console.info('============= END : Create STIX (Threat Actor) ===========');
    }

    async queryAllCars(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, Number, newevaluate) {
        console.info('============= START : changeevaluate ===========');

        const stixAsBytes = await ctx.stub.getState(Number); // get the car from chaincode state
        if (!stixAsBytes || stixAsBytes.length === 0) {
            throw new Error(`${Number} does not exist`);
        }
        const stix = JSON.parse(stixAsBytes.toString());
        stix.evaluate = newevaluate;

        await ctx.stub.putState(Number, Buffer.from(JSON.stringify(stix)));
        console.info('============= END : changeevaluate ===========');
    }

}

module.exports = FabCar;

/*
{
    "type": "threat-actor",
    "spec_version": "2.1",
    "id": "threat-actor--8b6297fe-cae7-47c6-9256-5584b417849c",
    "created_by_ref": "identity--b38dfe21-7477-40d1-aa90-5c8671ce51ca",
    "created": "2017-04-27T16:18:24.318Z",
    "modified": "2017-04-27T16:18:24.318Z",
    "name": "The Joker",
    "threat_actor_types": [
        "terrorist",
        "criminal"
        ],
    "aliases": [
        "Joe Kerr",
        "The Clown Prince of Crime"
    ],
    "roles": [
        "director"
    ],
    "resource_level": "team",
    "primary_motivation": "personal-satisfaction",
    "object_marking_refs": [
        "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed"
    ]
},
*/