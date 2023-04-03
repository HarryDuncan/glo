# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from protos import visualInputNode_pb2 as protos_dot_visualInputNode__pb2


class VisualInputNodeServiceStub(object):
    """Visual Input Node Service 

    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.InitializeVisualInputNode = channel.unary_unary(
                '/visualInputNode.VisualInputNodeService/InitializeVisualInputNode',
                request_serializer=protos_dot_visualInputNode__pb2.InitializeVisualInputNodeRequest.SerializeToString,
                response_deserializer=protos_dot_visualInputNode__pb2.InitializeVisualInputNodeResponse.FromString,
                )


class VisualInputNodeServiceServicer(object):
    """Visual Input Node Service 

    """

    def InitializeVisualInputNode(self, request, context):
        """<------------------- Initialization -------------------------------->
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_VisualInputNodeServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'InitializeVisualInputNode': grpc.unary_unary_rpc_method_handler(
                    servicer.InitializeVisualInputNode,
                    request_deserializer=protos_dot_visualInputNode__pb2.InitializeVisualInputNodeRequest.FromString,
                    response_serializer=protos_dot_visualInputNode__pb2.InitializeVisualInputNodeResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'visualInputNode.VisualInputNodeService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class VisualInputNodeService(object):
    """Visual Input Node Service 

    """

    @staticmethod
    def InitializeVisualInputNode(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/visualInputNode.VisualInputNodeService/InitializeVisualInputNode',
            protos_dot_visualInputNode__pb2.InitializeVisualInputNodeRequest.SerializeToString,
            protos_dot_visualInputNode__pb2.InitializeVisualInputNodeResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
