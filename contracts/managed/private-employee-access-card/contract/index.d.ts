import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  initializeFacility(context: __compactRuntime.CircuitContext<PS>,
                     initialCompanyName_0: string,
                     initialMinClearance_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  issueCard(context: __compactRuntime.CircuitContext<PS>,
            employeeSecretHash_0: Uint8Array,
            clearance_0: bigint,
            dept_0: bigint,
            expiration_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  verifyAccess(context: __compactRuntime.CircuitContext<PS>,
               employeeClearance_0: bigint,
               cardExpiration_0: bigint,
               requiredClearance_0: bigint,
               accessZoneId_0: bigint,
               currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  updateFacilityPolicy(context: __compactRuntime.CircuitContext<PS>,
                       newMinClearance_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  initializeFacility(context: __compactRuntime.CircuitContext<PS>,
                     initialCompanyName_0: string,
                     initialMinClearance_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  issueCard(context: __compactRuntime.CircuitContext<PS>,
            employeeSecretHash_0: Uint8Array,
            clearance_0: bigint,
            dept_0: bigint,
            expiration_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  verifyAccess(context: __compactRuntime.CircuitContext<PS>,
               employeeClearance_0: bigint,
               cardExpiration_0: bigint,
               requiredClearance_0: bigint,
               accessZoneId_0: bigint,
               currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  updateFacilityPolicy(context: __compactRuntime.CircuitContext<PS>,
                       newMinClearance_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  initializeFacility(context: __compactRuntime.CircuitContext<PS>,
                     initialCompanyName_0: string,
                     initialMinClearance_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  issueCard(context: __compactRuntime.CircuitContext<PS>,
            employeeSecretHash_0: Uint8Array,
            clearance_0: bigint,
            dept_0: bigint,
            expiration_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  verifyAccess(context: __compactRuntime.CircuitContext<PS>,
               employeeClearance_0: bigint,
               cardExpiration_0: bigint,
               requiredClearance_0: bigint,
               accessZoneId_0: bigint,
               currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  updateFacilityPolicy(context: __compactRuntime.CircuitContext<PS>,
                       newMinClearance_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly companyId: string;
  readonly issuedCardsCount: bigint;
  readonly accessGrantsCount: bigint;
  readonly minClearancePolicy: bigint;
  readonly latestAccessResult: boolean;
  readonly latestAccessZone: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
