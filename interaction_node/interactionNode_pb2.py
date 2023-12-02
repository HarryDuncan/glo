# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: interactionNode.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x15interactionNode.proto\x12\x0finteractionNode\"\"\n InitializeInteractionNodeRequest\";\n!InitializeInteractionNodeResponse\x12\x16\n\x0eis_initialized\x18\x01 \x01(\x08\"9\n\x10\x41lgorithimConfig\x12\x11\n\tthreshold\x18\x01 \x01(\x01\x12\x12\n\nkey_points\x18\x02 \x03(\x05\"\x9a\x01\n\x1aInitializeAlgorithmRequest\x12\x16\n\x0e\x61lgorithm_type\x18\x01 \x01(\t\x12;\n\x10\x61lgorithm_config\x18\x02 \x01(\x0b\x32!.interactionNode.AlgorithimConfig\x12\x1b\n\x13\x64\x61ta_transform_type\x18\x03 \x01(\t\x12\n\n\x02id\x18\x04 \x01(\t\"A\n\x1bInitializeAlgorithmResponse\x12\n\n\x02id\x18\x01 \x01(\t\x12\x16\n\x0eis_initialized\x18\x02 \x01(\x08\"\x15\n\x13RunAlgorithmRequest\"\xa8\x01\n\x14RunAlgorithmResponse\x12?\n\x06points\x18\x01 \x03(\x0b\x32/.interactionNode.RunAlgorithmResponse.Locations\x12\x1a\n\rerror_message\x18\x02 \x01(\tH\x00\x88\x01\x01\x1a!\n\tLocations\x12\t\n\x01x\x18\x01 \x01(\x01\x12\t\n\x01y\x18\x02 \x01(\x01\x42\x10\n\x0e_error_message\"\x16\n\x14StopAlgorithmRequest\"\x17\n\x15StopAlgorithmResponse2\xcd\x03\n\x16InteractionNodeService\x12\x82\x01\n\x19InitializeInteractionNode\x12\x31.interactionNode.InitializeInteractionNodeRequest\x1a\x32.interactionNode.InitializeInteractionNodeResponse\x12o\n\x12InitalizeAlgorithm\x12+.interactionNode.InitializeAlgorithmRequest\x1a,.interactionNode.InitializeAlgorithmResponse\x12]\n\x0cRunAlgorithm\x12$.interactionNode.RunAlgorithmRequest\x1a%.interactionNode.RunAlgorithmResponse0\x01\x12^\n\rStopAlgorithm\x12%.interactionNode.StopAlgorithmRequest\x1a&.interactionNode.StopAlgorithmResponseb\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'interactionNode_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _INITIALIZEINTERACTIONNODEREQUEST._serialized_start=42
  _INITIALIZEINTERACTIONNODEREQUEST._serialized_end=76
  _INITIALIZEINTERACTIONNODERESPONSE._serialized_start=78
  _INITIALIZEINTERACTIONNODERESPONSE._serialized_end=137
  _ALGORITHIMCONFIG._serialized_start=139
  _ALGORITHIMCONFIG._serialized_end=196
  _INITIALIZEALGORITHMREQUEST._serialized_start=199
  _INITIALIZEALGORITHMREQUEST._serialized_end=353
  _INITIALIZEALGORITHMRESPONSE._serialized_start=355
  _INITIALIZEALGORITHMRESPONSE._serialized_end=420
  _RUNALGORITHMREQUEST._serialized_start=422
  _RUNALGORITHMREQUEST._serialized_end=443
  _RUNALGORITHMRESPONSE._serialized_start=446
  _RUNALGORITHMRESPONSE._serialized_end=614
  _RUNALGORITHMRESPONSE_LOCATIONS._serialized_start=563
  _RUNALGORITHMRESPONSE_LOCATIONS._serialized_end=596
  _STOPALGORITHMREQUEST._serialized_start=616
  _STOPALGORITHMREQUEST._serialized_end=638
  _STOPALGORITHMRESPONSE._serialized_start=640
  _STOPALGORITHMRESPONSE._serialized_end=663
  _INTERACTIONNODESERVICE._serialized_start=666
  _INTERACTIONNODESERVICE._serialized_end=1127
# @@protoc_insertion_point(module_scope)
